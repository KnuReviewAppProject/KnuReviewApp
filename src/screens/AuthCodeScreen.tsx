import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { AuthCode } from '../utils/API/Auth';

const AuthCodeScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [code, setCode] = useState<string>('');
  const inputRef = useRef<OTPTextView>(null);

  const isCodeValid = code.length === 6;

  // const clearCode = () => inputRef.current?.clear();

  // View
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'white',
      }}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}
      extraHeight={300}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 10,
        }}>
        <Image
          source={require('../assets/auth_code.png')}
          style={{width: 230, height: 50}}
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
          marginBottom: 100,
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
          marginBottom: 10,
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
          onSubmitEditing={() => isCodeValid && AuthCode(code, navigation)} 
        />
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 70,
        }}>
        <Text style={{fontSize: 14, color: '#287BF3'}}>5: 00</Text>
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 70,
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
          onPress={() => isCodeValid && AuthCode(code, navigation)}
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
    </KeyboardAwareScrollView>
  );
};

export default AuthCodeScreen;
