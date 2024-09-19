import {
  NaverMapPathOverlay,
  NaverMapPolygonOverlay,
  NaverMapView,
  NaverMapViewRef,
  Region,
} from '@mj-studio/react-native-naver-map';
import React, { useRef } from 'react';
import { View } from 'react-native';

const LocationMapScreen = () => {
  // Logic
  const NaverMapViewRef = useRef<NaverMapViewRef>(null);
  const jejuRegion: Region = {
    latitude: 33.20530773,
    longitude: 126.14656715029,
    latitudeDelta: 0.38,
    longitudeDelta: 0.8,
  };

  // View
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <NaverMapView
        style={{flex: 1}}
        ref={NaverMapViewRef}
        initialRegion={jejuRegion}>
        <NaverMapPolygonOverlay
          outlineWidth={5}
          outlineColor={'#f2f2'}
          color={'#0068'}
          coords={[
            {latitude: 33.2249594, longitude: 126.54180047},
            {latitude: 33.25683311547, longitude: 126.18193},
            {latitude: 33.3332807, longitude: 126.838389399},
          ]}
        />
        <NaverMapPathOverlay
          coords={[
            {latitude: 33.5249594, longitude: 126.24180047},
            {latitude: 33.25683311547, longitude: 126.18193},
            {latitude: 33.3332807, longitude: 126.838389399},
          ]}
          width={8}
          color={'red'}
          progress={-0.6}
          passedColor={'green'}
        />
      </NaverMapView>
    </View>
  );
};

export default LocationMapScreen;
