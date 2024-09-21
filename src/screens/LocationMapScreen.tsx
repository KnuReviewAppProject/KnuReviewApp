import { NaverMapView, NaverMapViewRef, Region } from '@mj-studio/react-native-naver-map';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { getRestaurants } from '../utils/API/LocationAPI';

const LocationMapScreen = () => {
  // Logic
  const knuRegion: Region = {
    latitude: 37.2724406,
    longitude: 127.1275742,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const NaverMapViewRef = useRef<NaverMapViewRef>(null);

  useEffect(() => {
    getRestaurants();
  }, [])

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
        initialRegion={knuRegion}></NaverMapView>
    </View>
  );
};

export default LocationMapScreen;