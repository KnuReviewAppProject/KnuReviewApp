import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocationMapScreen from '../screens/LocationMapScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<ROOT_NAVIGATION>();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="LocationMapTabs">
      <Tab.Screen
        name="LocationMapTabs"
        component={LocationMapScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ProfileTabs"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default Tabs