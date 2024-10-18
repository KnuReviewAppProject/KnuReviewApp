import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import BookmarkScreen from '../screens/BookmarkScreen';
import LocationMapScreen from '../screens/LocationMapScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<ROOT_NAVIGATION>();

const Tabs = () => {
  // Logic

  // View
  return (
    <Tab.Navigator
      initialRouteName="LocationMapTabs"
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="LocationMapTabs"
        component={LocationMapScreen}
        options={{
          headerShown: false,
          tabBarLabel: '지도',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/location.png')}
              style={{tintColor: color, width: size, height: size}}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="BookmarkTabs"
        component={BookmarkScreen}
        options={{
          headerShown: false,
          tabBarLabel: '북마크',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/bookmark.png')}
              style={{tintColor: color, width: size, height: size}}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTabs"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: '프로필',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/profile.png')}
              style={{tintColor: color, width: size, height: size}}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
