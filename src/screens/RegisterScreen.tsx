import { HeaderBackButton } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  ColorValue,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { Register, VerifyNickName } from '../utils/API/AutAPI';
import { isValidNickName, isValidPassword } from '../utils/RegularExpression';
import { useAuthTokenStore, useEmailStore } from '../zustand/store';

const RegisterScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [nickname, setNickname] = useState<string>('');
  const [pwd1, setPwd1] = useState<string>('');
  const [pwd2, setPwd2] = useState<string>('');
  const [isNicknameFocused, setIsNicknameFocused] = useState<boolean>(false);
  const [isPwd1Focused, setIsPwd1Focused] = useState<boolean>(false);
  const [isPwd2Focused, setIsPwd2Focused] = useState<boolean>(false);
  const [isPwd1Visible, setIsPwd1Visible] = useState<boolean>(true);
  const [isPwd2Visible, setIsPwd2Visible] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [color, setColor] = useState<ColorValue>();

  const password1Ref = useRef<TextInput>(null);
  const password2Ref = useRef<TextInput>(null);

  const email = useEmailStore(state => state.email);
  const token = useAuthTokenStore(state => state.token);

  const isNickNameValid = isValidNickName(nickname);
  const isPassWordValid = pwd1 === pwd2 ? isValidPassword(pwd2) : false;

  const handlePassword1Submit = () => {
    if (password1Ref.current) {
      password1Ref.current.focus();
    }
  };

  const handlePassword2Submit = () => {
    if (password2Ref.current) {
      password2Ref.current.focus();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerBackTitleVisible: true,
      headerBackTitle: '',
      headerTitle: '',
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          onPress={() => navigation.navigate('AuthEmail')}
          labelVisible={false}
        />
      ),
    });
  })

  // View
  return (
    <KeyboardAwareScrollView
      style={{flex: 1, paddingHorizontal: 30, backgroundColor: 'white'}}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}
      extraHeight={300}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled">
      <Image
        source={require('../assets/register.png')}
        style={{width: 100, height: 100, marginBottom: 10}}
        resizeMode="contain"
      />

      <View
        style={{
          flexDirection: 'column',
          marginBottom: 50,
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>마지막으로</Text>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            <Text style={{color: '#287BF3'}}>프로필 정보</Text>를 입력하세요.
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
          닉네임
        </Text>

        <Pressable
          style={{backgroundColor: '#287BF3', borderRadius: 5, padding: 5}}
          onPress={() =>
            isNickNameValid &&
            VerifyNickName(nickname, token, setErrMsg, setColor)
          }>
          <Text style={{fontSize: 12, color: 'white'}}>중복 확인</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 55,
          borderBottomWidth: 3,
          borderColor: isNicknameFocused ? '#287BF3' : '#f4f4f4',
          marginBottom: 5,
        }}>
        <TextInput
          value={nickname}
          onChangeText={(text: string) => setNickname(text)}
          placeholder="닉네임"
          returnKeyType="next"
          autoCapitalize="none"
          keyboardType="email-address"
          onSubmitEditing={handlePassword1Submit}
          onFocus={() => setIsNicknameFocused(true)}
          onBlur={() => setIsNicknameFocused(false)}
          style={{flex: 1, paddingVertical: 0}}
        />

        <View>
          <TouchableOpacity onPress={() => setNickname('')}>
            <Image
              source={require('../assets/delete_email.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: '#C7C7CD',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {errMsg && (
        <Text
          style={{
            fontSize: 16,
            color: color,
            marginBottom: 20,
          }}>
          {errMsg}
        </Text>
      )}

      <Text
        style={{
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',
          marginBottom: 15,
        }}>
        이메일
      </Text>

      <View
        style={{
          width: '100%',
          height: 55,
          backgroundColor: '#f4f4f4',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          paddingLeft: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 16}}>{email}</Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',
          marginBottom: 5,
        }}>
        비밀번호
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 55,
          borderBottomWidth: 3,
          borderColor: isPwd1Focused ? '#287BF3' : '#f4f4f4',
          marginBottom: 5,
        }}>
        <TextInput
          ref={password1Ref}
          value={pwd1}
          onChangeText={(text: string) => setPwd1(text)}
          placeholder="비밀번호"
          returnKeyType="next"
          autoCapitalize="none"
          secureTextEntry={isPwd1Visible}
          keyboardType="visible-password"
          onSubmitEditing={handlePassword2Submit}
          onFocus={() => setIsPwd1Focused(true)}
          onBlur={() => setIsPwd1Focused(false)}
          style={{flex: 1, paddingVertical: 0}}
        />

        <View>
          {isPwd1Visible ? (
            <TouchableOpacity onPress={() => setIsPwd1Visible(!isPwd1Visible)}>
              <Image
                source={require('../assets/visible.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsPwd1Visible(!isPwd1Visible)}>
              <Image
                source={require('../assets/invisible.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 12}}>
          최소 8자~최대 12자의{' '}
          <Text style={{color: '#287BF3'}}>영어, 숫자, 특수문자</Text> 가능
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',
          marginBottom: 5,
        }}>
        비밀번호 확인
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 55,
          borderBottomWidth: 3,
          borderColor: isPwd2Focused ? '#287BF3' : '#f4f4f4',
          marginBottom: 5,
          // marginBottom: Platform.OS === 'ios' ? 30 : 70,
        }}>
        <TextInput
          ref={password2Ref}
          value={pwd2}
          onChangeText={(text: string) => setPwd2(text)}
          placeholder="비밀번호 확인"
          returnKeyType="next"
          autoCapitalize="none"
          secureTextEntry={isPwd2Visible}
          keyboardType="visible-password"
          onSubmitEditing={() =>
            isNickNameValid &&
            isPassWordValid &&
            Register(nickname, email, pwd2, token, navigation)
          }
          onFocus={() => setIsPwd2Focused(true)}
          onBlur={() => setIsPwd2Focused(false)}
          style={{flex: 1, paddingVertical: 0}}
        />

        <View>
          {isPwd2Visible ? (
            <TouchableOpacity onPress={() => setIsPwd2Visible(!isPwd2Visible)}>
              <Image
                source={require('../assets/visible.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsPwd2Visible(!isPwd2Visible)}>
              <Image
                source={require('../assets/invisible.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {pwd1 !== pwd2 && (
        <Text
          style={{
            marginBottom: Platform.OS === 'ios' ? 30 : 70,
            color: '#F33A28',
          }}>
          비밀번호가 일치하지 않습니다.
        </Text>
      )}

      <Pressable
        style={{
          width: '100%',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            isNickNameValid && isPassWordValid ? '#287BF3' : '#f4f4f4',
          borderRadius: 10,
        }}
        onPress={() =>
          isNickNameValid &&
          isPassWordValid &&
          Register(nickname, email, pwd2, token, navigation)
        }
        disabled={!isNickNameValid || !isPassWordValid}>
        <Text
          style={{
            color: isNickNameValid && isPassWordValid ? 'white' : 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          인증
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
