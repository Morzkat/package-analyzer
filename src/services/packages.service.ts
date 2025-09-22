import { Package, PackageInfo } from '../models/package.model';
import { PackageBundle } from '../models/packageBundle.model';
import packageRepository from '../database/package.repository';

const NPM_REGISTRY_URL = 'https://registry.npmjs.org';
const BUNDLE_REGISTRY_URL = 'https://bundlephobia.com/api/size';

const getInformation = async (name: string): Promise<Package> => {
  try {
    const response = await fetch(`${NPM_REGISTRY_URL}/${name}`);
    if (!response.ok) {
      throw new Error(`Error fetching package: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      name: data.name,
      time: data.time,
      readme: data.readme,
      repository: data.repository,
      bugs: data.bugs,
      'dist-tags': data['dist-tags'],
      description: data.description,
      license: data.license,
    };
  } catch (error) {
    console.error(`Failed to fetch package information for ${name}:`, error);
    throw error;
  }
};

const getSize = async (name: string, version: string): Promise<PackageBundle> => {
  try {
    const response = await fetch(`${BUNDLE_REGISTRY_URL}?package=${name}@${version}`);
    if (!response.ok) {
      throw new Error(`Error fetching package: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      assets: data.assets || [],
      dependencyCount: data.dependencyCount || 0,
      dependencySizes: data.dependencySizes || [],
      description: data.description || '',
      gzip: data.gzip || 0,
      hasJSModule: data.hasJSModule || false,
      hasJSNext: data.hasJSNext || false,
      hasSideEffects: data.hasSideEffects || false,
      isModuleType: data.isModuleType || false,
      name: data.name,
      repository: data.repository || '',
      scoped: data.scoped || false,
      size: data.size || 0,
      version: data.version || '',
    };
  } catch (error) {
    console.error(`Failed to fetch package size for ${name}:`, error);
    throw error;
  }
};

const analyzeDependencies = async (dependencies: {
  [key: string]: string;
}): Promise<PackageInfo[]> => {
  // const packageSizePromises: Array<Promise<PackageBundle>> = [];

  const pkgs = Object.entries(dependencies).map(async ([key, value]) => {
    console.log(`Dependency: ${key}, Version: ${value}`);

    let pkg = await packageRepository.get(key, value);
    if (pkg) {
      return {
        name: pkg.name,
        version: pkg.version,
        size: pkg.size,
        description: pkg.description || undefined,
        createdAt: pkg.createdAt,
        updateAt: pkg.updateAt,
        outdated: pkg.outdated,
        latestVersion: pkg.latestVersion || undefined,
        alternativePackages: pkg.alternativePackages ? pkg.alternativePackages.split(',') : [],
      };
    }

    const temp = mapFromPackageToPackageInfo(await getInformation(key), value);
    await packageRepository.add(temp);
    return temp;
  });

  return await Promise.all(pkgs);
};

const mapFromPackageToPackageInfo = (pkg: Package, version: string): PackageInfo => {
  return {
    name: pkg.name,
    version: version,
    size: 0,
    description: pkg.description,
    createdAt: pkg.time.created,
    updateAt: pkg.time.modified,
    outdated: isPkgOutdated(version, pkg['dist-tags'] ? pkg['dist-tags'].latest : version),
    latestVersion: pkg['dist-tags'] ? pkg['dist-tags'].latest : undefined,
    alternativePackages: [], //TODO: Implement logic to find alternative packages
  };
};

//TODO: Also consider validate lastes release date to consider a package as outdated
const isPkgOutdated = (currentVersion: string, latestVersion: string): boolean => {
  const currentVersionParts = currentVersion.split('.').map(Number);
  const latestVersionParts = latestVersion.split('.').map(Number);

  if (latestVersionParts[0] > currentVersionParts[0]) return true;
  if (latestVersionParts[1] > currentVersionParts[1]) return true;
  if (latestVersionParts[2] > currentVersionParts[2]) return true;

  return false;
};

export default {
  getInformation,
  getSize,
  analyzeDependencies,
};
