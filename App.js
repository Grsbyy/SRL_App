import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Homescreen from './screens/Homescreen';
import PlanScreen from './screens/PlanScreen';
import ActScreen from './screens/ActScreen';
import ReflectScreen from './screens/ReflectScreen';
import TaskPrioritizationScreen from './screens/TaskPrioritizationScreen';
import GoalSettingScreen from './screens/GoalSettingScreen';
//
//
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="Plan" component={PlanScreen} options={{ headerShown: null }} />
        <Stack.Screen name="Act" component={ActScreen} options={{ headerShown: null }}/>
        <Stack.Screen name="TaskPrioritization" component={TaskPrioritizationScreen} />
        <Stack.Screen name="Reflect" component={ReflectScreen} />
        <Stack.Screen name="GoalSetting" component={GoalSettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
