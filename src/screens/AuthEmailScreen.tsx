import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { AuthEmail } from '../utils/API/Auth';
import { isValidEmail } from '../utils/RegularExpression';
import { useEmailStore } from '../zustand/store';

const AuthEmailScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [email, setEmail] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const setEmailInStore = useEmailStore(state => state.setEmail);

  const isEmailValid = isValidEmail(email);

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
        source={require('../assets/auth_email.png')}
        style={{width: 100, height: 100, marginBottom: 10}}
        resizeMode="contain"
      />

      <Text style={{fontSize: 25, fontWeight: 'bold'}}>본인인증을 위한</Text>
      <View>
        <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>
          <Text style={{color: '#287BF3'}}>이메일</Text>을 입력하세요.
        </Text>
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 55,
          marginBottom: 100,
          borderBottomWidth: 3,
          borderColor: isFocused ? '#287BF3' : '#f4f4f4',
        }}>
        <TextInput
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          placeholder="이메일"
          returnKeyType="next"
          autoCapitalize="none"
          keyboardType="email-address"
          onSubmitEditing={() =>
            isEmailValid && AuthEmail(email, setEmailInStore, navigation)
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{flex: 1, paddingVertical: 0}}
        />
        <View>
          <TouchableOpacity onPress={() => setEmail('')}>
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

      <Pressable
        style={{
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isEmailValid ? '#287BF3' : '#f4f4f4',
          borderRadius: 10,
        }}
        onPress={() =>
          isEmailValid && AuthEmail(email, setEmailInStore, navigation)
        }
        disabled={!isEmailValid}>
        <Text
          style={{
            color: isEmailValid ? 'white' : 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          인증
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default AuthEmailScreen;
