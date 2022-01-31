import * as React from "react";
import { useEffect, useState } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { View } from "~presentation/components/Themed";
import { RootTabScreenProps } from "../../../../../types";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../../Index.vm";
import MapViewModel from "./Map.vm";
import { MAIN_SCREEN_NAME } from "../../Main";
import GoogleMap from "~presentation/components/Local/GoogleMap";
import * as Location from "expo-location";
import useIsMounted from "hooks/useIsMounted";
import { Region } from "react-native-maps";

const Map = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.MAP>) => {
  const vm = getRootViewModel<MapViewModel>((viewModel) => viewModel.tab.Map);
  const [location, setLocation] = useState<Region>();
  const isMounted = useIsMounted();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        vm.setError(true);
        return;
      }

      let locationInfo = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: locationInfo.coords.latitude,
        longitude: locationInfo.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, [isMounted]);

  if (vm.isLoading) {
    return <Loadable />;
  }

  if (vm.isError) {
    return <ErrorMsg />;
  }

  return (
    <ContentLayout title="Tab Three">
      <View>
        <GoogleMap
          vm={vm}
          region={location}
          latitude={location?.latitude}
          longitude={location?.longitude}
          onRegionChange={(region) => {
            // console.log(`TCL ~ [index.tsx] ~ line ~ 60 ~ region`, region);
            // setLocation(region);
          }}
        />
      </View>
    </ContentLayout>
  );
};

export default Map;
