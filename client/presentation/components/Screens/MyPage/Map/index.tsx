import * as React from "react";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { View } from "~presentation/components/Themed";
import { RootTabScreenProps } from "../../../../../types";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../../Index.vm";
import MapViewModel from "./Map.vm";
import { observer } from "mobx-react";
import { MAIN_SCREEN_NAME } from "../../Main";
import GoogleMap from "~presentation/components/Local/GoogleMap";

const Map = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.MAP>) => {
  const vm = getRootViewModel<MapViewModel>((viewModel) => viewModel.tab.Map);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  // TODO : 현재 위치 가져오는 단계에서 에러 발생
  useEffect(() => {
    // async function loadPosts() {
    //   await vm.load();
    // }
    // loadPosts();

    Location.installWebGeolocationPolyfill();
    const { geolocation } = navigator;

    if (!geolocation) {
      throw Error("Geolocation is not supported.");
    }

    geolocation.getCurrentPosition(
      (position) => {
        console.log(`TCL ~ [index.tsx] ~ line ~ 41 ~ position`, position);
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        vm.setError(true);
        console.error(error.message);
      }
    );
  }, []);

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
          latitude={location?.latitude}
          longitude={location?.longitude}
          onRegionChange={() => setLocation(location)}
        />
      </View>
    </ContentLayout>
  );
};

export default observer(Map);
