import { ANDROID_API_URL, IOS_API_URL } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' ? IOS_API_URL : ANDROID_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// 요청 인터셉터 추가하기
axiosInstance.interceptors.request.use(
  config => {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  error => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
  response => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  error => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

export default axiosInstance;