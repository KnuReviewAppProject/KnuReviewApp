import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import { Login } from '../utils/API/AutAPI';

const LoginScreen = () => {
  // Logic
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const handleEmailSubmit = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // // useFocusEffect로 스크린 데이터 초기화
  // useFocusEffect(
  //   React.useCallback(() => {
  //     setEmail('');
  //     setPwd('');
  //   }, []),
  // );

  // View
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: 'white',
      }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}
        extraHeight={300}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled">
        <Image
          source={require('../assets/login.jpg')}
          resizeMode="contain"
          style={{width: 200, height: 200, marginBottom: 20}}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 55,
            paddingLeft: 15,
            borderRadius: 10,
            backgroundColor: '#f4f4f4',
            marginBottom: 15,
          }}>
          <TextInput
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            placeholder="이메일"
            onSubmitEditing={handleEmailSubmit}
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            style={{flex: 1, paddingVertical: 0}}
          />

          <View>
            <TouchableOpacity onPress={() => setEmail('')}>
              <Image
                source={require('../assets/delete_email.png')}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 15,
                  tintColor: '#C7C7CD',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 55,
            paddingLeft: 15,
            borderRadius: 10,
            backgroundColor: '#f4f4f4',
            marginBottom: 15,
          }}>
          <TextInput
            ref={inputRef}
            value={pwd}
            onChangeText={(text: string) => setPwd(text)}
            placeholder="비밀번호"
            returnKeyType="next"
            keyboardType="visible-password"
            secureTextEntry={isVisible}
            onSubmitEditing={() => {
              Login(email, pwd, navigation);
            }}
            style={{flex: 1, paddingVertical: 0}}
          />
          <View>
            {isVisible ? (
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Image
                  source={require('../assets/visible.png')}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    marginRight: 15,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Image
                  source={require('../assets/invisible.png')}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    marginRight: 15,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 70,
          }}>
          <BouncyCheckbox
            size={20}
            unFillColor="white"
            fillColor="#287BF3"
            iconStyle={{borderRadius: 3, marginRight: 10}}
            innerIconStyle={{borderRadius: 3}}
            disableText
            isChecked={isAutoLogin}
            onPress={() => setIsAutoLogin(!isAutoLogin)}
          />

          <Text>자동 로그인하기</Text>
        </View>

        <Pressable
          style={{
            width: '100%',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#287BF3',
            borderRadius: 10,
            marginBottom: 15,
          }}
          onPress={() => {
            Login(email, pwd, navigation);
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            로그인
          </Text>
        </Pressable>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14, marginRight: 10}}>
            아직 회원이 아니신가요?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('AuthEmail')}>
            <Text style={{fontSize: 14, color: '#287BF3', fontWeight: 'bold'}}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
