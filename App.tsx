import { NavigationContainer } from '@react-navigation/native-stack';
import React from 'react';
import AuthCodeScreen from './src/screens/AuthCodeScreen';
import AuthEmailScreen from './src/screens/AuthEmailScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SignupFinishedScreen from './src/screens/SignupFinishedScreen';

const Stack = createNativeStackNavigator<ROOT_NAVIGATION>();


const App = () => {
  // Logic
    
  // View
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
