import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import { Restaurant } from '../utils/data/type';

interface BottomSheetScrollViewRenderItemProps {
  data: Restaurant;
  index: number;
}

const BottomSheetScrollViewRenderItem: React.FC<
  BottomSheetScrollViewRenderItemProps
> = ({data, index}) => {

  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  return (
    <View key={index} style={{flex: 1}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailLocation', {data: data})
        }>
        <Image
          source={{uri: data.imageUrl}}
          style={{width: '100%', height: 200, marginBottom: 10}}
          resizeMode="center"
        />
        <View style={{paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginRight: 10,
              }}>
              {data.name}
            </Text>

            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#D9D9D9',
                color: '#D9D9D9',
              }}>
              {data.category}
            </Text>
          </View>

          {data.description && <Text>{data.description}</Text>}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                color: '#FB0505',
                marginRight: 20,
              }}>
              0.0km
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}>
              리뷰 000개
            </Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderColor: '#D9D9D9',
            marginVertical: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetScrollViewRenderItem;
