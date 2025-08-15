import { Package } from "../models/package.model";
import { PackageBundle } from "../models/packageBundle.model";

const NPM_REGISTRY_URL = "https://registry.npmjs.org";
const BUNDLE_REGISTRY_URL = "https://bundlephobia.com/api/size";

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
      maintainers: data.maintainers || [],
      readme: data.readme || "",
      repository: data.repository,
      bugs: data.bugs,
    };
  } catch (error) {
    console.error(`Failed to fetch package information for ${name}:`, error);
    throw error;
  }
};

const getSize = async (
  name: string,
  version: string
): Promise<PackageBundle> => {
  try {
    const response = await fetch(
      `${BUNDLE_REGISTRY_URL}?package=${name}@${version}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching package: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      assets: data.assets || [],
      dependencyCount: data.dependencyCount || 0,
      dependencySizes: data.dependencySizes || [],
      description: data.description || "",
      gzip: data.gzip || 0,
      hasJSModule: data.hasJSModule || false,
      hasJSNext: data.hasJSNext || false,
      hasSideEffects: data.hasSideEffects || false,
      isModuleType: data.isModuleType || false,
      name: data.name,
      repository: data.repository || "",
      scoped: data.scoped || false,
      size: data.size || 0,
      version: data.version || "",
    };
  } catch (error) {
    console.error(`Failed to fetch package size for ${name}:`, error);
    throw error;
  }
};

export default {
  getInformation,
  getSize,
};
