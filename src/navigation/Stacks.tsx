import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthCodeScreen from '../screens/AuthCodeScreen';
import AuthEmailScreen from '../screens/AuthEmailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SignupFinishedScreen from '../screens/SignupFinishedScreen';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator<ROOT_NAVIGATION>();

const Stacks = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen name="AuthEmail" component={AuthEmailScreen} />

      <Stack.Screen name="AuthCode" component={AuthCodeScreen} />

      <Stack.Screen name="Register" component={RegisterScreen} />

      <Stack.Screen
        name="SignupFinish"
        component={SignupFinishedScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{gestureEnabled: false, headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
