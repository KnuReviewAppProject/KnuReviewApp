import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';

const BookmarkScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  // View
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>BookmarkScreen</Text>
    </View>
  );
};

export default BookmarkScreen;
