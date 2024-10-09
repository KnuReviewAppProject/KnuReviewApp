import { HeaderBackButton } from '@react-navigation/elements';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import EmptyReviewMessage from '../components/EmptyReviewMessage';
import ReviewsRenderItem from '../components/ReviewsRenderItem';
import { getReview } from '../utils/API/LocationAPI';
import { useReviewStore } from '../zustand/store';

const DetailLocationScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();
  const route = useRoute<RouteProp<ROOT_NAVIGATION, 'DetailLocation'>>();
  const {data} = route.params;

  const [isOnlyPic, setIsOnlyPic] = useState<boolean>(false);

  const reviews = useReviewStore(state => state.reviews);
  const setReviewStore = useReviewStore(state => state.setReviews);

  const filteredReviews = reviews.filter(review => review.name === data.name);

  const sortedReviews = filteredReviews.sort((a, b) => {
    const aDate =
      a.createdAt && typeof a.createdAt._seconds === 'number'
        ? new Date(
            a.createdAt._seconds * 1000 + a.createdAt._nanoseconds / 1000000,
          )
        : new Date(0); // createdAt이 없을 경우 가장 오래된 날짜로 처리

    const bDate =
      b.createdAt && typeof b.createdAt._seconds === 'number'
        ? new Date(
            b.createdAt._seconds * 1000 + b.createdAt._nanoseconds / 1000000,
          )
        : new Date(0); // createdAt이 없을 경우 가장 오래된 날짜로 처리

    return bDate.getTime() - aDate.getTime(); // getTime()으로 밀리초 반환
  });

  // Checkbox 값에 따라 reviews 필터링
  const displayedReviews = isOnlyPic
    ? sortedReviews.filter(review => review.images && review.images.length > 0)
    : sortedReviews;

  const totalReviews = filteredReviews.length;
  const totalRating = filteredReviews.reduce(
    (acc, review) => acc + review.rating,
    0,
  );
  const rating =
    totalReviews > 0 ? Number((totalRating / totalReviews).toFixed(1)) : 0; // 소수점 첫째자리

    // 각 유저의 리뷰 수와 추천/비추천 수 계산
  const userReviewStats = filteredReviews.reduce((acc, review) => {
    const { nickname, recommend } = review;
    if (!acc[nickname]) {
      acc[nickname] = { reviews: 0, good: 0, bad: 0 };
    }
    acc[nickname].reviews += 1; // 리뷰 수 증가
    if (recommend === 'good') {
      acc[nickname].good += 1; // 추천 수 증가
    } else if (recommend === 'bad') {
      acc[nickname].bad += 1; // 비추천 수 증가
    }
    return acc;
  }, {} as Record<string, { reviews: number; good: number; bad: number }>);

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

  // useFocusEffect로 스크린이 다시 활성화될 때마다 최신 리뷰를 가져옴
  useFocusEffect(
    React.useCallback(() => {
      getReview(setReviewStore); // 서버에서 리뷰 데이터 새로 가져오기
    }, []),
  );

  // View
  return (
    <ScrollView
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
          marginBottom: 30,
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
              navigation.navigate('ReviewCreate', {
                name: data.name,
                category: data.category,
                address: data.address,
                location: {
                  x: data.y,
                  y: data.x,
                },
                imageURL: data.imageUrl,
              })
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
          borderWidth: 3,
          borderColor: '#D9D9D9',
          marginBottom: 20,
        }}
      />

      {displayedReviews.length === 0 ? (
        <EmptyReviewMessage />
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
            }}>
            <BouncyCheckbox
              size={20}
              unFillColor="white"
              fillColor="#287BF3"
              iconStyle={{borderRadius: 3, marginRight: 5}}
              innerIconStyle={{borderRadius: 3}}
              disableText
              isChecked={isOnlyPic}
              onPress={() => setIsOnlyPic(!isOnlyPic)}
            />
            <Text>사진 리뷰만 보기 </Text>
          </View>

          <FlatList
            style={{paddingHorizontal: 30}}
            data={displayedReviews}
            renderItem={({item}) => (
              <ReviewsRenderItem
                data={item}
                userStats={userReviewStats[item.nickname]}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
          />
        </>
      )}
    </ScrollView>
  );
};

export default DetailLocationScreen;
