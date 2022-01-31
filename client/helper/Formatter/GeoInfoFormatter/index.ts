type Locationtype = {
  latitude: number;
  longitude: number;
};

const GeoDataToAddress = async ({ latitude, longitude }: Locationtype) => {
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GCP_IOS_KEY}`
  );
  console.log(`TCL ~ [index.ts] ~ line ~ 10 ~ result`, result);
};

export default GeoDataToAddress;
