import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const Login = (
  email: string,
  password: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  console.log('로그인 성공');
};

export const AuthEmail = (
  email: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
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
  console.log('회원가입 성공');
  navigation.navigate('Login');
};
