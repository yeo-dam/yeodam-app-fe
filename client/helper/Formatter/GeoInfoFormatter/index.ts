type Locationtype = {
  latitude: number;
  longitude: number;
};

async function GeoDataToAddress({ latitude, longitude }: Locationtype) {
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GCP_IOS_KEY}`
  );
  return result;
}

export default GeoDataToAddress;
