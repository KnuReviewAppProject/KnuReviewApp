import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocationMapScreen from '../screens/LocationMapScreen';

const Tab = createBottomTabNavigator<ROOT_NAVIGATION>();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="LocationMapTabs">
      <Tab.Screen name="LocationMapTabs" component={LocationMapScreen} />
    </Tab.Navigator>
  );
}

export default Tabs