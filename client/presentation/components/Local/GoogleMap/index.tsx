import * as React from "react";
import { useEffect, useState } from "react";
import MapView, {
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";
import { observer } from "mobx-react";
import useIsMounted from "hooks/useIsMounted";
import MapViewModel from "~presentation/components/Screens/MyPage/Map/Map.vm";

type Props = {
  vm: MapViewModel;
  latitude?: number;
  longitude?: number;
} & MapViewProps;

const GoogleMap = ({
  vm,
  latitude = 37.5326,
  longitude = 127.024612,
  region,
  onRegionChange,
}: Props) => {
  useEffect(() => {
    async function loadPlaces() {
      await vm.load();
    }
    loadPlaces();
    return () => console.log("cleanup");
  }, []);

  return (
    <Wrapper>
      <StyledMapView
        region={region}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={onRegionChange}
      >
        {vm.places.map((item) => {
          return (
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </StyledMapView>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const StyledMapView = styled(MapView)`
  width: ${Dimensions.get("window").width + "px"};
  height: ${Dimensions.get("window").height + "px"};
`;

export default observer(GoogleMap);
