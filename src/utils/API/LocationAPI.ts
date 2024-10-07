import { ANDROID_API_URL, IOS_API_URL } from '@env';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Alert, Platform } from 'react-native';
import { ROOT_NAVIGATION } from '../../@types/ROOT_NAVIGATION';
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
  if(!email){
    Alert.alert('알림', '다시 로그인 해주세요.');
    Logout(navigation);
  }

  try {
    axios
      .post(`${API_URL}/api/create-review`, {
        email: email,
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
export const getReview = (setReviewStore: (data: Review[]) => void) => {
  try {
    axios
      .get(`${API_URL}/api/get-reviews`)
      .then(res => {
        // 이제 사용자 정보가 포함된 리뷰 데이터를 출력
        setReviewStore(res.data); // 사용자 정보가 포함된 리뷰 데이터를 상태로 설정
      })
      .catch(err => console.log(`try 에러: ${err}`));
  } catch (error) {
    console.log(`catch 에러: ${error}`);
  }
};
