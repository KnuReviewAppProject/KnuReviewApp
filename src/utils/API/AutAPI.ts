import { ANDROID_API_URL, IOS_API_URL } from '@env';
import { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Alert, Platform } from 'react-native';
import { ROOT_NAVIGATION } from '../../@types/ROOT_NAVIGATION';
import {
  useAuthTokenStore,
  useEmailStore,
  useMessageIDStore,
  useMyReviewStore,
  useReviewStore,
  useUserStore,
} from '../../zustand/store';

const API_URL = Platform.OS === 'ios' ? IOS_API_URL : ANDROID_API_URL;

const {setToken} = useAuthTokenStore.getState();
const {setEmail} = useEmailStore.getState();
const {setMessageID} = useMessageIDStore.getState();

const {setUser, clearUser} = useUserStore.getState();
const {clearReviews} = useReviewStore.getState();
const {clearMyReviews} = useMyReviewStore.getState();

// 이메일 중복 여부 판단 api 함수
export const AuthEmail = async (
  email: string,
  setErrMsg: (errMsg: string) => void,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!email) {
    return Alert.alert('알림', '이메일을 입력해주세요.');
  }

  try {
    await axios
      .post(`${API_URL}/api/verify-email`, {email: email})
      .then(res => {
        console.log(JSON.stringify(res.data, null, 5));

        setEmail(email);
        setToken(res.data.token);
        setMessageID(res.data.messageID);

        navigation.navigate('AuthCode');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400) {
            return setErrMsg('입력한 이메일을 확인해주세요.');
          } else if (err.response.status === 401) {
            return setErrMsg('이미 가입된 계정 이메일입니다.');
          } else if (err.response.status === 500) {
            return Alert.alert('이메일 인증 실패', '서버 통신 실패');
          }
        }
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

// 인증코드 발송 api 함수
export const AuthCode = (
  email: string,
  code: string,
  token: string,
  messageID: string,
  setErrMsg: (errMsg: string) => void,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!email || !token || !messageID) {
    return Alert.alert('알림', '다시 이메일을 입력해주세요.');
  }

  if (!code) {
    return Alert.alert('알림', '인증번호를 입력해주세요.');
  }

  try {
    axios
      .post(`${API_URL}/api/verify-code`, {
        email: email,
        code: code,
        token: token,
        messageID: messageID,
      })
      .then(res => {
        console.log(JSON.stringify(res.data, null, 5));
        setToken(res.data.token);
        navigation.navigate('Register');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400) {
            return setErrMsg('입력한 인증코드를 다시 확인해주세요.');
          } else if (err.response.status === 402) {
            return setErrMsg('인증코드를 다시 발급 받아주세요.');
          } else if (err.response.status === 410) {
            return setErrMsg('인증 시간이 만료되었습니다.');
          } else if (err.response.status === 404) {
            return setErrMsg('인증 코드가 일치하지 않습니다.');
          } else if (err.response.status === 500) {
            return Alert.alert('인증코드 인증 실패', '서버 통신 실패');
          }
        }
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

// 닉네임 중복여부 판단 api 함수
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

// 회원가입 api 함수
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
        navigation.navigate('SignupFinish');
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

// 로그인 api 함수
export const Login = (
  email: string,
  password: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  if (!email && !password) {
    return Alert.alert('로그인 실패', '이메일과 비밀번호를 입력해주세요.');
  }

  if (!email) {
    return Alert.alert('로그인 실패', '이메일을 입력해주세요.');
  }

  if (!password) {
    return Alert.alert('로그인 실패', '비밀번호를 입력해주세요.');
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      const user = result.user;
      axios
        .post(`${API_URL}/api/login`, {
          uid: user.uid,
        })
        .then(res => {
          const result = JSON.stringify(res.data, null, 5);

          console.log(result);
          setUser(res.data);
          navigation.navigate('Tabs');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

// 로그아웃 api
export const Logout = (
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('로그아웃');
        clearUser();
        clearReviews();
        clearMyReviews();
        navigation.navigate('Login');
      })
      .catch(err => console.log('try 에러: ', err));
  } catch (error) {
    console.log(error);
  }
};

// 프로필 수정 api
export const EditProfile = (
  uid: string,
  email: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
  nickname?: string,
  password?: string,
) => {
  if (!uid || !email) {
    return Alert.alert('알림', '다시 로그인해주세요.');
  }

  if (!nickname || !nickname.trim()) {
    return Alert.alert('알림', '닉네임을 입력해주세요.');
  }

  if (!password || !password.trim()) {
    return Alert.alert('알림', '비밀번호를 입력해주세요.');
  }

  try {
    axios
      .post(`${API_URL}/api/edit-profile`, {
        uid: uid,
        email: email,
        nickname: nickname,
        password: password,
      })
      .then(() => {
        Alert.alert('프로필 수정', '다시 로그인 해주세요.', [
          {
            text: '로그인 하러 가기',
            onPress: () => {
              Logout(navigation);
              // navigation.navigate('Login');
            },
          },
        ]);
      })
      .catch(err => console.log('try 에러: ', err));
  } catch (error) {
    console.log('catch 에러: ', error);
  }
};

// 프로필 이미지 수정 api
export const EditProfileImage = (
  uid: string,
  email: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
  imageData: string | null,
  setUserProfileImageStore: (image: string | null) => void,
  fileName?: string,
  imageURL?: string,
) => {
  if (!uid || !email) {
    return Alert.alert('알림', '다시 로그인해주세요.');
  }

  // if (!fileName || !imageURL) {
  //   return Alert.alert('알림', '이미지를 선택해주세요.');
  // }

  try {
    if (imageData == null) {
      axios
        .post(`${API_URL}/api/edit-profile-image`, {
          uid: uid,
          email: email,
          imageURL: imageData,
        })
        .then(res => {
          if (res.status === 200) {
            setUserProfileImageStore(imageData);
            navigation.goBack();
          }
        })
        .catch(err => console.log(err));
    } else {
      if (Platform.OS === 'android') {
        storage()
          .ref(fileName)
          .putString(imageData)
          .then(async () => {
            const downloadURL = await storage().ref(fileName).getDownloadURL();
            setUserProfileImageStore(downloadURL);
            axios
              .post(`${API_URL}/api/edit-profile-image`, {
                uid: uid,
                email: email,
                imageURL: downloadURL,
              })
              .then(res => {
                if (res.status === 200) {
                  console.log(res.data);
                  navigation.goBack();
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log('try 에러: ', err));
      } else if (Platform.OS === 'ios') {
        storage()
          .ref(fileName)
          .putFile(imageData)
          .then(async () => {
            const downloadURL = await storage().ref(fileName).getDownloadURL();
            setUserProfileImageStore(downloadURL);
            axios
              .post(`${API_URL}/api/edit-profile-image`, {
                uid: uid,
                email: email,
                imageURL: downloadURL,
              })
              .then(res => {
                if (res.status === 200) {
                  console.log(res.data);
                  navigation.goBack();
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log('try 에러: ', err));
      }
    }
  } catch (error) {
    console.log('error 에러: ', error);
  }
};

// 회원탈퇴 api
export const Unsubscribe = (
  uid: string,
  email: string,
  navigation: NativeStackNavigationProp<ROOT_NAVIGATION>,
) => {
  try {
    axios
      .post(`${API_URL}/api/delete-account`, {
        uid: uid,
        email: email,
      })
      .then(() => {
        clearUser();
        clearReviews();
        clearMyReviews();
        navigation.navigate('Login');
      })
      .catch(err => console.log('try 에러: ', err));
  } catch (error) {
    console.log('catch 에러: ', error);
  }
};
