export type TimeInfo = {
  created: string;
  modified: string;
  [key: string]: string; 
};

export type Maintainer = {
  name: string;
  email: string;
};

export type Package = {
  name: string;
  time: TimeInfo;
  readme: string;
  'dist-tags': { [key: string]: string };
  description?: string;
  license?: string;
  repository?: {
    type: string;
    url: string;
  };
  bugs?: {
    url: string;
  };
};

export type PackageInfo = {
  name: string;
  version: string;
  size: number;
  description?: string;
  createdAt: string;
  updateAt: string;
  outdated: boolean;
  latestVersion?: string;
  alternativePackages?: string[];
}