import { HeaderBackButton } from '@react-navigation/elements';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';

const DetailLocationScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();
  const route = useRoute<RouteProp<ROOT_NAVIGATION, 'DetailLocation'>>();
  const {data} = route.params;

  const [rating, setRating] = useState<number>(3);

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: true,
      headerTitle: data.name,
      headerLeft: props => {
        return (
          <HeaderBackButton
            {...props}
            onPress={() => navigation.goBack()}
            labelVisible={false}
          />
        );
      },
    });
  });

  // View
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Image
        source={{uri: data.imageUrl}}
        style={{width: '100%', height: 200, marginBottom: 30}}
        resizeMode="center"
      />

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 15,
        }}>
        {data.name}
      </Text>

      <Text
        style={{
          alignSelf: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginBottom: 20,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#D9D9D9',
          color: '#D9D9D9',
        }}>
        {data.category}
      </Text>

      <StarRatingDisplay
        style={{
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        rating={rating}
        starSize={50}
        emptyColor="#D9D9D9"
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 10,
        }}>
        {rating}
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          borderWidth: 0.5,
          borderColor: '#D9D9D9',
          marginVertical: 20,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${data.phone}`)}>
            <Image
              source={require('../assets/call.png')}
              style={{width: 24, height: 24, marginBottom: 10}}
              resizeMode="contain"
            />
            <Text>전화</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: '100%',
            marginHorizontal: 40,
            borderWidth: 0.5,
            borderColor: '#D9D9D9',
          }}
        />

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../assets/unclicked_star.png')}
              style={{width: 24, height: 24, marginBottom: 10}}
              resizeMode="contain"
            />
            <Text>저장</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: '100%',
            marginHorizontal: 40,
            borderWidth: 0.5,
            borderColor: '#D9D9D9',
          }}
        />

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ReviewCreate', {name: data.name, imageURL: data.imageUrl})
            }>
            <Image
              source={require('../assets/edit.png')}
              style={{width: 24, height: 24, marginBottom: 10}}
              resizeMode="contain"
            />
            <Text>작성</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          marginVertical: 20,
          borderWidth: 3,
          borderColor: '#D9D9D9',
        }}
      />
    </View>
  );
};

export default DetailLocationScreen;
