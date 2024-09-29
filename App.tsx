import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { Platform } from "react-native";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import Navigator from './src/navigation/Navigator';

const App = () => {
  // Logic
  useEffect(() => {
    // ios 권한 설정
    if(Platform.OS === 'ios'){
      requestMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ])
        .then(status => {
          console.log(`request status: ${status}`);
        })
        .catch(error => {
          console.error(`request has been failed: ${error}`);
        });
    }

    // android 권한 설정
    if(Platform.OS === 'android'){
      requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      ]).then((status) => {
        console.log(`request status: ${status}`);
      }).catch(error => {
        console.error(`request has been failed: ${error}`);
      })
    }
  }, []);

  // View
  return (
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
  );
};

export default App;
