import { HeaderBackButton } from '@react-navigation/elements';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating-widget';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import ReviewImageRenderItem from '../components/ReviewImageRenderItem';
import { addReview } from '../utils/API/LocationAPI';
import { ReviewImage } from '../utils/data/type';
import { getDataWithEmptyView, removeImage } from '../utils/ReviewImage';
import { useUserStore } from '../zustand/store';

const ReviewCreateScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();
    
  const route = useRoute<RouteProp<ROOT_NAVIGATION, 'ReviewCreate'>>();
  const {name, category, address, location, imageURL} = route.params;

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<ReviewImage[]>([]);
  const [recommend, setRecommend] = useState<string | null>(null);

  const dataWithEmptyView = getDataWithEmptyView(images, 3);

  const user = useUserStore(state => state.user);

  const handleSelectGoodorBad = (state: string) => {
    setRecommend(state); // 눌린 버튼의 상태 업데이트
  };

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerTitle: '리뷰 작성',
      headerLeft: props => {
        return (
          <HeaderBackButton
            {...props}
            onPress={() => navigation.goBack()}
            labelVisible={false}
          />
        );
      },
      headerRight: props => (
        <Pressable
          {...props}
          style={{
            backgroundColor: '#287BF3',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          onPress={() =>
            addReview(
              user.email,
              user.uid,
              name,
              category,
              address,
              location,
              rating,
              content,
              images,
              recommend,
              navigation
            )
          }>
          <Text style={{fontSize: 15, color: 'white'}}>등록하기</Text>
        </Pressable>
      ),
    });
  });

  // View
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      extraScrollHeight={300}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Image
        source={{uri: imageURL}}
        style={{width: '100%', height: 200, marginBottom: 30}}
        resizeMode="center"
      />

      <Text
        style={{
          fontSize: 14,
          fontWeight: 'medium',
          color: '#D2D2D2',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        이 식당(또는 카페, 주점 등)에 대한 리뷰를 작성해주세요!
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        {name}
      </Text>

      <StarRating
        rating={rating}
        starSize={50}
        emptyColor="#D9D9D9"
        onChange={setRating}
        style={{marginBottom: 20}}
      />

      <Text style={{fontSize: 16, fontWeight: 'bold'}}>평점: {rating}</Text>

      <View style={{width: '100%', paddingHorizontal: 30}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginBottom: 10,
          }}>
          리뷰
        </Text>

        <TextInput
          style={{
            width: '100%',
            height: 150,
            borderRadius: 10,
            backgroundColor: '#F4F4F4',
            textAlignVertical: 'top',
            marginBottom: 20,
          }}
          value={content}
          onChangeText={(text: string) => setContent(text)}
          placeholder="학우분들을 위해 방문한 식당(또는 카페, 주점 등)에 대해서 리뷰를 작성해주세요!"
          multiline={true}
        />

        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginBottom: 10,
          }}>
          리뷰
        </Text>

        <FlatList
          style={{marginBottom: 30}}
          data={dataWithEmptyView}
          renderItem={({item}) => (
            <ReviewImageRenderItem
              item={item}
              onRemove={id => removeImage(id, images, setImages)}
              images={images}
              setImages={setImages}
            />
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          scrollEnabled={false}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => handleSelectGoodorBad('good')}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 48, // Image보다 크게 설정
                height: 48, // Image보다 크게 설정
                borderWidth: 0.5,
                borderColor: '#F4F4F4',
                borderRadius: 48 / 2, // 원형을 유지하기 위해 반지름 설정
                backgroundColor:
                  recommend === 'good' ? '#F4F4F4' : 'transparent', // 버튼이 눌렸을 때 배경색 변경
              }}>
              <Image
                source={require('../assets/good.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: recommend === 'good' ? 'black' : '#F4F4F4',
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectGoodorBad('bad')}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 48, // Image보다 크게 설정
                height: 48, // Image보다 크게 설정
                borderWidth: 0.5,
                borderColor: '#F4F4F4',
                borderRadius: 48 / 2, // 원형을 유지하기 위해 반지름 설정
                backgroundColor:
                  recommend === 'bad' ? '#F4F4F4' : 'transparent', // 버튼이 눌렸을 때 배경색 변경
              }}>
              <Image
                source={require('../assets/bad.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: recommend === 'bad' ? 'black' : '#F4F4F4',
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ReviewCreateScreen;
