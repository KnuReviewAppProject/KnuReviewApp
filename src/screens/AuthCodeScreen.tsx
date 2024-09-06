import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';


const AuthCodeScreen = () => {
  // Logic
  const navigation =
  useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [code, setCode] = useState<number>(0);

  const AuthCode = (code: number) => {
    navigation.navigate('Register');
  }


  // Logic
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>AuthEmailScreen</Text>
    </View>
  );
};

export default AuthCodeScreen;
