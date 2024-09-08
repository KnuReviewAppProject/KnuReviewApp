import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';

const AuthCodeScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [code, setCode] = useState<string>('');
  const inputRef = useRef<OTPTextView>(null);

  const isCodeValid = code.length === 6;

  const clearCode = () => inputRef.current?.clear();

  const AuthCode = (code: string) => {
    navigation.navigate('Register');
  };

  // View
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 30,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'flex-start',
          // marginBottom: 5,
        }}>
        <Image
          source={require('../assets/auth_code.png')}
          style={{width: 230, height: 100}}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 8,
        }}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            본인인증을 위한
          </Text>
        </View>

        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            <Text style={{color: '#287BF3'}}>인증코드</Text>를 입력하세요.
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 60,
        }}>
        <Text style={{fontSize: 15, fontWeight: 'medium', color: '#50555C'}}>
          본인인증에만 활용되며, 절대 노출되지 않아요.
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <OTPTextView
          containerStyle={{marginBottom: 5, height: 55}}
          ref={inputRef}
          inputCount={6}
          handleTextChange={(text: string) => setCode(text)}
          keyboardType="numeric"
          tintColor="#287BF3"
          offTintColor="#f4f4f4"
          autoFocus={true}
        />

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignSelf: 'flex-start',
          }}>
          <Text style={{fontSize: 18, color: '#287BF3'}}>5 : 00</Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 110,
        }}>
        <TouchableOpacity>
          <Text style={{fontSize: 18, color: '#287BF3'}}>재전송</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '100%',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isCodeValid ? '#287BF3' : '#f4f4f4',
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => AuthCode(code)}
          disabled={!isCodeValid}>
          <Text
            style={{
              color: isCodeValid ? 'white' : 'black',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            인증
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthCodeScreen;
