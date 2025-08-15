export type TimeInfo = {
  created: string;
  modified: string;
  [key: string]: string; // Additional properties can be added dynamically
};

export type Maintainer = {
  name: string;
  email: string;
};

export type Package = {
  name: string;
  time: TimeInfo;
  maintainers: Maintainer[];
  readme: string;
  repository?: {
    type: string;
    url: string;
  };
  bugs?: {
    url: string;
  };
};
