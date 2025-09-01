interface RegionMapping {
  [key: string]: {
    geographicRegion: string;
    displayName: string;
  };
}

export const awsRegionMapping: RegionMapping = {
  'us-north-1': { geographicRegion: 'North America', displayName: 'North America' },
  'us-north-2': { geographicRegion: 'North America', displayName: 'North America' },
  'us-south-1': { geographicRegion: 'North America', displayName: 'North America' },
  'us-south-2': { geographicRegion: 'North America', displayName: 'North America' },
  'ca-central-1': { geographicRegion: 'North America', displayName: 'North America' },
  'eu-west-1': { geographicRegion: 'Europe', displayName: 'Europe' },
  'eu-west-2': { geographicRegion: 'Europe', displayName: 'Europe' },
  'eu-central-1': { geographicRegion: 'Europe', displayName: 'Europe' },
  'ap-southeast-1': { geographicRegion: 'Asia Pacific', displayName: 'Asia Pacific' },
  'ap-southeast-2': { geographicRegion: 'Asia Pacific', displayName: 'Asia Pacific' },
  'ap-northeast-1': { geographicRegion: 'Asia Pacific', displayName: 'Asia Pacific' },
  'ap-south-1': { geographicRegion: 'Asia Pacific', displayName: 'Asia Pacific' },
  'sa-east-1': { geographicRegion: 'South America', displayName: 'South America' }
};

export const geographicRegions = [
  'North America',
  'Europe',
  'Asia Pacific',
  'South America'
];
