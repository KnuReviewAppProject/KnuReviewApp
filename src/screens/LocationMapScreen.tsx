import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { formatJson, generateArray } from '@mj-studio/js-util';
import {
  Camera,
  ClusterMarkerProp,
  MapType,
  NaverMapMarkerOverlay,
  NaverMapView,
  NaverMapViewRef,
  Region,
} from '@mj-studio/react-native-naver-map';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import BottomSheetScrollViewHeader from '../components/BottomSheetScrollViewHeader';
import BottomSheetScrollViewRenderItem from '../components/BottomSheetScrollViewRenderItem';
import { getRestaurants } from '../utils/API/LocationAPI';
import { Restaurant } from '../utils/data/type';

const Cameras = {
  KNU: {
    latitude: 37.271855,
    longitude: 127.127626,
    zoom: 14,
  },
} satisfies Record<string, Camera>;

const Regions = {
  KNU_Region: {
    latitude: 37.271855,
    longitude: 127.127626,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
} satisfies Record<string, Region>;

const MapTypes = [
  'Basic',
  'Navi',
  'Satellite',
  'Hybrid',
  'Terrain',
  'NaviHybrid',
  'None',
] satisfies MapType[];

const LocationMapScreen = () => {
  // Logic
  const ref = useRef<NaverMapViewRef>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [indoor, setIndoor] = useState(false);
  const [mapType, setMapType] = useState<MapType>(MapTypes[0]!);
  const [lightness, setLightness] = useState(0);
  const [compass, setCompass] = useState(true);
  const [scaleBar, setScaleBar] = useState(true);
  const [zoomControls, setZoomControls] = useState(true);
  const [indoorLevelPicker, setIndoorLevelPicker] = useState(true);
  const [myLocation, setMyLocation] = useState(true);
  const [hash, setHash] = useState(0);
  const [camera, setCamera] = useState(Cameras.KNU);
  
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['35%', '50%'], []);

  const clusters = useMemo<
    {
      markers: ClusterMarkerProp[];
      screenDistance?: number;
      minZoom?: number;
      maxZoom?: number;
      animate?: boolean;
      width?: number;
      height?: number;
    }[]
  >(() => {
    return generateArray(5).map(i => {
      return {
        width: 200,
        height: 200,
        markers: generateArray(3).map<ClusterMarkerProp>(
          j =>
            ({
              image: {
                httpUri: `https://picsum.photos/seed/${hash}-${i}-${j}/32/32`,
              },
              width: 100,
              height: 100,
              latitude: Cameras.KNU.latitude,
              longitude: Cameras.KNU.longitude,
              identifier: `${hash}-${i}-${j}`,
            } satisfies ClusterMarkerProp),
        ),
      };
    });
  }, [hash]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);


  const handleSheetBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="collapse"
        style={[props.style, {backgroundColor: 'transparent'}]}
      />
    ),
    [],
  );

  useEffect(() => {
    getRestaurants(setRestaurants);
    bottomSheetModalRef.current?.present(); // 스크린 로드 시 바텀 시트 표시
  }, []);

  // View
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <BottomSheetModalProvider>
        <NaverMapView
          style={{flex: 1}}
          ref={ref}
          initialCamera={{
            latitude: 37.271855,
            longitude: 127.127626,
            zoom: 15,
          }}
          locale="ko"
          layerGroups={{
            BUILDING: true,
            BICYCLE: false,
            CADASTRAL: false,
            MOUNTAIN: false,
            TRAFFIC: false,
            TRANSIT: false,
          }}
          mapType={mapType}
          initialRegion={Regions.KNU_Region}
          camera={camera}
          isIndoorEnabled={indoor}
          isShowCompass={compass}
          isShowIndoorLevelPicker={indoorLevelPicker}
          isShowScaleBar={scaleBar}
          isShowZoomControls={zoomControls}
          isShowLocationButton={myLocation}
          lightness={lightness}
          clusters={clusters}
          onInitialized={() => console.log('initialized!')}
          onTapClusterLeaf={({markerIdentifier}) => {
            console.log('onTapClusterLeaf', markerIdentifier);
          }}
          onTapMap={args => console.log(`Map Tapped: ${formatJson(args)}`)}>
          {restaurants.map((restaurant, _) => (
            <NaverMapMarkerOverlay
              key={restaurant.id}
              latitude={parseFloat(restaurant.y)}
              longitude={parseFloat(restaurant.x)}
              onTap={() => console.log(`Tapped on: ${restaurant.name}`)}
              anchor={{x: 0.5, y: 1}}
              width={20}
              height={20}>
              <View style={{width: 50, height: 50, backgroundColor: 'red'}} />
            </NaverMapMarkerOverlay>
          ))}
        </NaverMapView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={handleSheetBackdrop}
          enablePanDownToClose={false}>
          <BottomSheetScrollView>
            <BottomSheetScrollViewHeader />
            {restaurants.map((data, index) => (
              <BottomSheetScrollViewRenderItem
                data={data}
                index={index}
              />
            ))}
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default LocationMapScreen;
