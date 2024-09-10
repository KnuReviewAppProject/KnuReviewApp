import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';

export const Login = (
  email: string,
  password: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  console.log('로그인 성공');
};

export const AuthEmail = (
  email: string,
  setEmailInStore: (email: string) => void,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  setEmailInStore(email);
  console.log('이메일 인증 성공');
  navigation.navigate('AuthCode');
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
