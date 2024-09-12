import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthCodeScreen from './src/screens/AuthCodeScreen';
import AuthEmailScreen from './src/screens/AuthEmailScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator<ROOT_NAVIGATION>();

const App = () => {
  // Logic

  // View
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AuthEmail"
          component={AuthEmailScreen}
          options={{
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="AuthCode"
          component={AuthCodeScreen}
          options={{
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
