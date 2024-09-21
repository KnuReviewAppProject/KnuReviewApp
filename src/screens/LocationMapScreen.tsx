import { NaverMapMarkerOverlay, NaverMapView, NaverMapViewRef, Region } from '@mj-studio/react-native-naver-map';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { getRestaurants } from '../utils/API/LocationAPI';
import { Restaurant } from '../utils/data/type';

const LocationMapScreen = () => {
  // Logic
  const knuRegion: Region = {
    latitude: 37.2724406,
    longitude: 127.1275742,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // 마커에 사용할 레스토랑 데이터 저장
  const NaverMapViewRef = useRef<NaverMapViewRef>(null);

  useEffect(() => {
    getRestaurants(setRestaurants);
  }, []);

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
        initialCamera={{
          latitude: 37.2718550, 
          longitude: 127.1276260,
          zoom: 15
        }}>
        {restaurants.map((restaurant, index) => (
          <NaverMapMarkerOverlay
            key={index}
            latitude={parseFloat(restaurant.y)}
            longitude={parseFloat(restaurant.x)}
            onTap={() => console.log(`Tapped on: ${restaurant.name}`)}
            anchor={{x: 0.5, y: 1}}
            caption={{
              key: `${restaurant.id}`,
              text: restaurant.name, // 레스토랑 이름 표시
            }}
            width={20}
            height={20}>
            <View style={{width: 50, height: 50, backgroundColor: 'red'}} />
          </NaverMapMarkerOverlay>
        ))}
      </NaverMapView>
    </View>
  );
};

export default LocationMapScreen;