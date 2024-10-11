import { ANDROID_API_URL, IOS_API_URL } from '@env';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Alert, Platform } from 'react-native';
import { ROOT_NAVIGATION } from '../../@types/ROOT_NAVIGATION';
import { useReviewStore } from '../../zustand/store';
import { Restaurant, Review, ReviewImage } from '../data/type';
import { Logout } from './AutAPI';

const API_URL = Platform.OS === 'ios' ? IOS_API_URL : ANDROID_API_URL;

// 데이터 수집 api 함수
export const getRestaurants = (
  setRestaurants: (data: Restaurant[]) => void,
) => {
  {
    try {
      axios
        .get(`${API_URL}/api/getRestaurants`)
        .then(res => {
          console.log(res.data);
          setRestaurants(res.data.results);
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log('catch 에러: ', error);
    }
  }
};

// 리뷰 추가 api 함수
export const addReview = (
  email: string,
  uid: string,
  name: string,
  category: string,
  address: string,
  location: object,
  rating: number,
  content: string,
  images: ReviewImage[],
  recommend: string | null,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!email || !uid) {
    Alert.alert('알림', '다시 로그인 해주세요.');
    Logout(navigation);
  }

  try {
    axios
      .post(`${API_URL}/api/create-review`, {
        email: email,
        uid: uid,
        name: name,
        category: category,
        addressName: address,
        location: location,
        rating: rating,
        content: content,
        images: images,
        recommend: recommend,
      })
      .then(res => {
        if (res.status === 200) {
          navigation.goBack();
        }
      })
      .catch(err => console.log(err));
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

// 리뷰 읽기 api 함수
export const getReview = () => {
  const {setReviews} = useReviewStore.getState();

  try {
    axios
      .get(`${API_URL}/api/get-reviews`)
      .then(res => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch(err => console.log(`try 에러: ${err}`));
  } catch (error) {
    console.log(`catch 에러: ${error}`);
  }
};

// 내가 쓴 리뷰 읽기 api 함수
export const getMyReviews = (
  email: string,
  setMyReviewStore: (data: Review[]) => void,
) => {
  try {
    axios
      .get(`${API_URL}/api/get-myreviews`, {params: {email}})
      .then(res => {
        setMyReviewStore(res.data); // 가져온 리뷰 데이터를 상태로 설정
      })
      .catch(err => console.log(`Error getting user reviews: ${err}`));
  } catch (error) {
    console.log(`catch 에러: ${error}`);
  }
};

// 리뷰 삭제 api 함수
export const deleteReview = (
  reviewID: string,
  onSuccess: () => void, // 삭제 성공 시 호출될 함수
  onError: (error: any) => void, // 삭제 실패 시 호출될 함수
) => {
  if (!reviewID) {
    Alert.alert('리뷰 ID가 제공되지 않았습니다.');
    return;
  }

  try {
    axios
      .delete(`${API_URL}/api/delete-review`, {
        data: {reviewID}, // DELETE 요청에 데이터를 전송
      })
      .then(res => {
        if (res.status === 200) {
          console.log('리뷰 삭제 성공:', res.data);
          getReview();
          onSuccess(); // 성공 시 콜백 호출
        }
      })
      .catch(err => {
        console.error('리뷰 삭제 실패:', err);
        onError(err); // 실패 시 콜백 호출
        Alert.alert('리뷰 삭제에 실패했습니다.');
      });
  } catch (error) {
    console.error('리뷰 삭제 중 오류:', error);
    onError(error); // 실패 시 콜백 호출
    Alert.alert('리뷰 삭제 중 문제가 발생했습니다.');
  }
};
