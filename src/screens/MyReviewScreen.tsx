import { HeaderBackButton } from '@react-navigation/elements';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import MyReviewsRenderItem from '../components/MyReviewsRenderItem';
import { getMyReviews } from '../utils/API/LocationAPI';
import { useMyReviewStore, useUserStore } from '../zustand/store';

const MyReviewScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const email = useUserStore(state => state.user.email);
  const myReviews = useMyReviewStore(state => state.myreviews);
  const setMyReviewStore = useMyReviewStore(state => state.setMyReviews);

  // 각 유저의 리뷰 수, 추천, 비추천 수 계산
  const userReviewStats = myReviews.reduce(
    (acc, review) => {
      if (!acc[review.nickname]) {
        acc[review.nickname] = { reviews: 0, good: 0, bad: 0 };
      }
      acc[review.nickname].reviews += 1;
      if (review.recommend === 'good') {
        acc[review.nickname].good += 1;
      } else if (review.recommend === 'bad') {
        acc[review.nickname].bad += 1;
      }
      return acc;
    },
    {} as Record<string, { reviews: number; good: number; bad: number }>
  );

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerTitle: '내가 쓴 글',
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
      getMyReviews(email, setMyReviewStore); // 서버에서 리뷰 데이터 새로 가져오기
    }, []),
  );

  // View
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      {myReviews.length === 0 ? (
        <Text style={{textAlign: 'center', marginVertical: 20}}>
          작성한 리뷰가 없습니다.
        </Text>
      ) : (
        <FlatList
          style={{paddingHorizontal: 30}}
          data={myReviews}
          renderItem={({item}) => (
            <MyReviewsRenderItem
              data={item}
              userReviewStats={userReviewStats[item.nickname]}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
};

export default MyReviewScreen;
