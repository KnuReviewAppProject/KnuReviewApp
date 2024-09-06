import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';

const AuthEmailScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [email, setEmail] = useState<string>('');

  const AuthEmail = (email: string) => {
    navigation.navigate('AuthCode');
  }

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
          marginBottom: 10,
        }}>
        <Image
          source={require('../assets/auth_email.png')}
          style={{width: 100, height: 100}}
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
            <Text style={{color: '#287BF3'}}>이메일</Text>을 입력하세요.
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
          marginBottom: 100,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 55,
            borderBottomWidth: 3,
            borderColor: '#f4f4f4',
          }}>
          <TextInput
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            placeholder="이메일"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            onSubmitEditing={() => AuthEmail(email)}
            style={{flex: 1, paddingVertical: 0}}
          />

          <View>
            <TouchableOpacity onPress={() => setEmail('')}>
              <Image
                source={require('../assets/delete_email.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: '#C7C7CD',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#287BF3',
          borderRadius: 10,
        }}>
        <TouchableOpacity onPress={() => AuthEmail(email)}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            인증
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthEmailScreen;
