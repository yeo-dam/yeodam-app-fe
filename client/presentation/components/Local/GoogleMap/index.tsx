import * as React from "react";
import MapView, {
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { observer } from "mobx-react";

type Props = {
  latitude?: number;
  longitude?: number;
} & MapViewProps;

const GoogleMap = ({ latitude = 37.5326, longitude = 127.024612 }: Props) => {
  console.log(
    `TCL ~ [index.tsx] ~ line ~ 13 ~ latitude
longitude`,
    latitude,
    longitude
  );

  return (
    <Wrapper>
      <StyledMapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Marker
        coordinate={{ latitude, longitude }}
        title="this is a marker"
        description="this is a marker example"
      />
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
