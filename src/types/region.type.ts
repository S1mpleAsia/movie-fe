export interface RegionType {
  flags: FlagType;
  name: RegionName;
}

interface FlagType {
  png: string;
  svg: string;
  alt: string;
}

interface RegionName {
  common: string;
  official: string;
}
