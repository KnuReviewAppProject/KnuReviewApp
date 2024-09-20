import { NaverMapView, Region } from '@mj-studio/react-native-naver-map';
import React from 'react';
import { View } from 'react-native';

const LocationMapScreen = () => {
  // Logic
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
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <NaverMapView style={{flex: 1}} locale="ko" initialRegion={jejuRegion} />
    </View>
  );
}

export default LocationMapScreen