import { ANDROID_API_URL, IOS_API_URL } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' ? IOS_API_URL : ANDROID_API_URL;

export const getRestaurants = () => {
  {
    try {
      axios
        .get(`${API_URL}/api/getRestaurants`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    } catch (error) {
      console.log('catch 에러: ', error);
    }
  }
};
