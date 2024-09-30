import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Restaurant } from '../utils/data/type';

interface BottomSheetScrollViewRenderItemProps {
  data: Restaurant;
  index: number;
}

const BottomSheetScrollViewRenderItem: React.FC<
  BottomSheetScrollViewRenderItemProps
> = ({data, index}) => {
  return (
    <View
      key={index}
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 15,
      }}>
      <Image
        source={{uri: data.imageUrl}}
        style={{width: '100%', height: 250, borderRadius: 15}}
        resizeMode="center"
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignSelf: 'flex-start',
          marginTop: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 5}}>
            {data.name}
          </Text>

          <Text style={{color: 'gray'}}>{data.category}</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              source={require('../assets/unclicked_star.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderWidth: 0.5,
          borderColor: 'lightgray',
          marginVertical: 20,
        }}
      />
    </View>
  );
};

export default BottomSheetScrollViewRenderItem;
