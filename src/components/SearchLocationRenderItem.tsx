import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import { SearchLocation } from '../utils/data/type';


interface SearchLocationRenderItemProps {
    data: SearchLocation;
}

const SearchLocationRenderItem: React.FC<SearchLocationRenderItemProps> = ({
  data,
}) => {

  // Logic
  const navigation = useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  // View
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('LocationMapTabs', {selectedLocation: data})
      }
      style={{padding: 10, borderBottomWidth: 1, borderColor: '#ccc'}}>
      <Text>{data.place_name}</Text>
    </TouchableOpacity>
  );
};

export default SearchLocationRenderItem