import { ANDROID_API_URL, IOS_API_URL } from '@env';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Alert, Platform } from 'react-native';

export const Login = (
  email: string,
  password: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  console.log('로그인 성공');
};

export const AuthEmail = async (
  email: string,
  setEmailInStore?: (email: string) => void,
  navigation?: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  try {
    const API_URL = Platform.OS === 'ios' ? IOS_API_URL : ANDROID_API_URL;
    const response = await axios.post(`${API_URL}/api/verify-email`, {
      email: email,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const AuthCode = (
  code: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  console.log('인증코드 인증 성공');
  navigation.navigate('Register');
};

export const Register = (
  nickname: string,
  email: string,
  password: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!nickname || !email || !password) {
    Alert.alert('닉네임, 이메일, 비밀번호를 모두 입력해주세요.');
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        console.log('User account created & signed in!');
        const {uid} = result.user;
        firebase.auth().currentUser?.updateProfile({displayName: nickname});
        firestore()
          .collection('Users')
          .doc(email)
          .set({nickname, uid})
          .then(() => console.log('User added!'));
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
};
