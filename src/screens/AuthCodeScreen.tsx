import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  ColorValue,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { AuthCode, AuthEmail } from '../utils/API/AutAPI';
import { formatTime } from '../utils/common';
import { isValidCode } from '../utils/RegularExpression';
import { useAuthTokenStore, useEmailStore } from '../zustand/store';

const AuthCodeScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(300);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [color, setColor] = useState<ColorValue>();

  const inputRef = useRef<OTPTextView>(null);

  const isCodeValid = isValidCode(code);

  const email = useEmailStore(state => state.email);
  const token = useAuthTokenStore(state => state.token);

  const setEmailInStore = useEmailStore(state => state.setEmail);
  const setAuthTokenStore = useAuthTokenStore(state => state.setToken);

  const clearCode = () => {
    inputRef.current?.clear();
    setTimer(300);
    AuthEmail(
      email,
      setErrMsg,
      setEmailInStore,
      setAuthTokenStore,
      setColor,
      navigation,
    );
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


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
        source={require('../assets/auth_code.png')}
        style={{width: 230, height: 100, marginBottom: 10}}
        resizeMode="contain"
      />

      <View style={{flexDirection: 'column', marginBottom: 8}}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>본인인증을 위한</Text>

        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            <Text style={{color: '#287BF3'}}>인증코드</Text>를 입력하세요.
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: 15,
          fontWeight: 'medium',
          color: '#50555C',
          marginBottom: 100,
        }}>
        본인인증에만 활용되며, 절대 노출되지 않아요.
      </Text>

      <OTPTextView
        containerStyle={{height: 55, marginBottom: 5}}
        ref={inputRef}
        inputCount={6}
        handleTextChange={(text: string) => setCode(text)}
        keyboardType="numeric"
        tintColor="#287BF3"
        offTintColor="#f4f4f4"
        onSubmitEditing={() =>
          isCodeValid &&
          AuthCode(
            email,
            code,
            token,
            setErrMsg,
            setColor,
            setAuthTokenStore,
            navigation,
          )
        }
      />

      <Text
        style={{
          fontSize: 14,
          color: '#287BF3',
          marginBottom: 5,
        }}>
        {formatTime(timer)}
      </Text>

      {errMsg && (
        <Text
          style={{
            marginBottom: Platform.OS === 'ios' ? 70 : 100,
            fontSize: 16,
            color: '#F33A28',
          }}>
          {errMsg}
        </Text>
      )}

      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginBottom: Platform.OS === 'ios' ? 70 : 150,
        }}
        onPress={clearCode}>
        <Text style={{fontSize: 18, color: '#287BF3'}}>재전송</Text>
      </TouchableOpacity>

      <Pressable
        style={{
          width: '100%',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isCodeValid ? '#287BF3' : '#f4f4f4',
          borderRadius: 10,
        }}
        onPress={() =>
          isCodeValid &&
          AuthCode(
            email,
            code,
            token,
            setErrMsg,
            setColor,
            setAuthTokenStore,
            navigation,
          )
        }
        disabled={!isCodeValid}>
        <Text
          style={{
            color: isCodeValid ? 'white' : 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          인증
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default AuthCodeScreen;
