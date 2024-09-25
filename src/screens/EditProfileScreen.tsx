import { HeaderBackButton } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, Platform, Pressable, Text, TextInput, View } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { isValidNickName, isValidPassword } from '../utils/RegularExpression';
import { useUserStore } from '../zustand/store';

const EditProfileScreen = () => {
  // Logic
  const [nickname, setNickname] = useState<string>('');
  const [pwd1, setPwd1] = useState<string>('');
  const [pwd2, setPwd2] = useState<string>('');

  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const user = useUserStore(state => state.user);
  

  const isNickNameValid = isValidNickName(nickname);
  const isPassWordValid = pwd1 === pwd2 ? isValidPassword(pwd2) : false;

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerBackTitleVisible: true,
      headerBackTitle: '',
      headerTitle: '',
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          onPress={() => navigation.goBack()}
          labelVisible={false}
        />
      ),
      headerRight: props => (
        <Pressable
          style={{
            backgroundColor: '#287BF3',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <Text style={{fontSize: 15, color: 'white'}}>수정하기</Text>
        </Pressable>
      ),
    });
  });

  // View
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginBottom: 20,
        }}
        source={require('../assets/user.png')}
        resizeMode="contain"
      />

      <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 25}}>
        닉네임
      </Text>

      <View
        style={{
          borderWidth: 5,
          borderColor: '#ECECEC',
          width: '100%',
          marginBottom: 45,
        }}
      />

      <View style={{paddingHorizontal: 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
            }}>
            닉네임
          </Text>

          <Pressable
            style={{backgroundColor: '#287BF3', borderRadius: 5, padding: 5}}>
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
            paddingLeft: 15,
            borderRadius: 10,
            backgroundColor: '#f4f4f4',
            marginBottom: 15,
          }}>
          <TextInput
            value={nickname}
            onChangeText={(text: string) => setNickname(text)}
            placeholder="닉네임"
            // onSubmitEditing={handleEmailSubmit}
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="name-phone-pad"
            style={{flex: 1, paddingVertical: 0}}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 10,
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
              paddingLeft: 15,
              borderRadius: 10,
              backgroundColor: '#f4f4f4',
              marginBottom: 15,
            }}>
            <TextInput
              value={pwd1}
              onChangeText={(text: string) => setPwd1(text)}
              placeholder="비밀번호"
              // onSubmitEditing={handleEmailSubmit}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="visible-password"
              style={{flex: 1, paddingVertical: 0}}
            />
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 10,
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
              paddingLeft: 15,
              borderRadius: 10,
              backgroundColor: '#f4f4f4',
              marginBottom: 15,
            }}>
            <TextInput
              value={pwd2}
              onChangeText={(text: string) => setPwd2(text)}
              placeholder="비밀번호 확인"
              // onSubmitEditing={handleEmailSubmit}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="visible-password"
              style={{flex: 1, paddingVertical: 0}}
            />
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
      </View>
    </View>
  );
};

export default EditProfileScreen;
