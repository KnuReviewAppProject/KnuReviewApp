import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';

const SignupFinishedScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  // View
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../assets/success_register.jpg')}
        style={{width: 150, height: 150, marginBottom: 50}}
      />
      <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 17}}>
        가입이 완료되었어요!
      </Text>

      <View style={{flexDirection: 'column', marginBottom: 200}}>
        <Text style={{textAlign: 'center'}}>
          지금 바로 방문하고 싶은 맛집을 찾아보거나,
        </Text>
        <Text style={{textAlign: 'center'}}>
          방문한 맛집 리뷰를 등록해보세요!
        </Text>
      </View>

      <Pressable
        style={{
          width: '100%',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#287BF3',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          서비스 이용하러 가기
        </Text>
      </Pressable>
    </View>
  );
};

export default SignupFinishedScreen;
