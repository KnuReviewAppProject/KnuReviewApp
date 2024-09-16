import { ANDROID_API_URL, IOS_API_URL } from '@env';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Alert, Platform } from 'react-native';

export const API_URL = Platform.OS === 'ios' ? IOS_API_URL : ANDROID_API_URL;

export const Login = (
  email: string,
  password: string,
  // token: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!email || !email.trim()) {
    Alert.alert('입력', '이메일을 입력해주세요.');
  }

  if (!password || !password.trim()) {
    Alert.alert('입력', '비밀번호를 입력해주세요.');
  }

  try {
    axios
      .post(`${API_URL}/api/login`, {
        email: email,
        password: password,
        // token: token,
      })
      .then(res => {
        console.log(res.status);
        console.log(res.data);
      })
      .catch(err => {
        console.log('try 에러: ', err);
      });
  } catch (error) {
    console.log('catch 에러: ', error);
  }
};

export const AuthEmail = (
  email: string,
  setErrMsg: (errMsg: string) => void,
  setEmailInStore: (email: string) => void,
  setAuthTokenStore: (token: string) => void,
  setColor: (color: string) => void,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!email || !email.trim()) {
    Alert.alert('알림', '이메일을 입력해주세요.');
  }

  try {
    axios
      .post(`${API_URL}/api/verify-email`, {email: email})
      .then(res => {
        console.log(res.status);
        console.log(res.data);
        setColor('#287BF3');
        setEmailInStore(email);
        setAuthTokenStore(res.data.token);
        navigation.navigate('AuthCode');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400) {
            setErrMsg('입력한 이메일을 다시 확인해주세요.');
            setColor('#FF0000');
          } else if (err.response.status === 409) {
            setErrMsg('이미 존재하는 이메일 입니다.');
            setColor('#FF0000');
          }
        }
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export const AuthCode = (
  email: string,
  code: string,
  token: string,
  setErrMsg: (errMsg: string) => void,
  setColor: (color: string) => void,
  setAuthTokenStore: (token: string) => void,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!email || !email.trim()) {
    Alert.alert('알림', '이메일을 입력해주세요.');
  }

  if (!code || !code.trim()) {
    Alert.alert('알림', '인증번호를 입력해주세요.');
  }

  try {
    axios
      .post(`${API_URL}/api/verify-code`, {
        email: email,
        code: code,
        token: token,
      })
      .then(res => {
        console.log(res.status);
        console.log(res.data);
        setAuthTokenStore(res.data.token);
        navigation.navigate('Register');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400) {
            setErrMsg('입력한 인증코드를 다시 확인해주세요.');
            setColor('#FF0000');
          } else if (err.response.status === 404) {
            setErrMsg('인증코드를 다시 발급 받아주세요.');
            setColor('#FF0000');
          } else if (err.response.status === 410) {
            setErrMsg('인증 시간이 만료되었습니다.');
            setColor('#FF0000');
          } else if (err.response.status === 401) {
            setErrMsg('인증 코드가 일치하지 않습니다.');
            setColor('#FF0000');
          }
        }
        console.log(err);
      });
  } catch (error) {
    console.log('catch에러: ', error);
  }
};

export const VerifyNickName = (
  nickname: string,
  token: string,
  setErrMsg: (errMsg: string) => void,
  setColor: (color: string) => void,
) => {
  try {
    axios
      .post(`${API_URL}/api/verify-nickname`, {
        nickname: nickname,
        token: token,
      })
      .then(res => {
        if (res.status === 200) {
          setErrMsg('사용 가능한 닉네임 입니다.');
          setColor('#287BF3');
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400) {
            setErrMsg('입력한 닉네임을 다시 확인해주세요.');
            setColor('#FF0000');
          } else if (err.response.status === 409) {
            setErrMsg('이미 존재하는 닉네임입니다.');
            setColor('#FF0000');
          }
        }
        console.log(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export const Register = (
  nickname: string,
  email: string,
  password: string,
  token: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!nickname || !nickname.trim()) {
    Alert.alert('알림', '닉네임을 입력해주세요.');
  }

  if (!email || !email.trim()) {
    Alert.alert('알림', '이메일을 입력해주세요.');
  }

  if (!password || !password.trim()) {
    Alert.alert('알림', '비밀번호를 입력해주세요.');
  }

  try {
    axios
      .post(`${API_URL}/api/register`, {
        nickname: nickname,
        email: email,
        password: password,
        token: token,
      })
      .then(res => {
        console.log(res.status);
        console.log(res.data);
        navigation.navigate('Login');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400) {
            Alert.alert(
              '알림',
              '입력한 닉네임, 이메일, 비밀번호를 확인해주세요.',
            );
          } else if (err.response.status === 409) {
            Alert.alert('알림', '이미 존재하는 계정 입니다.');
          }
        }
        console.log(err);
      });
  } catch (error) {
    console.error(error);
  }
};
