import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlanScreen from './screens/PlanScreen';
import ActScreen from './screens/ActScreen';
import ReflectScreen from './screens/ReflectScreen';
import TaskPrioritizationScreen from './screens/TaskPrioritizationScreen';
import GoalSettingScreen from './screens/GoalSettingScreen';
import AcadStratScreen from './screens/AcadStratScreen';
import ASSurvey from './screens/ASSurvey';
import GWACalcScreen from './screens/GWACalcScreen';
import Homescreen from './screens/Homescreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Home" component={Homescreen} options={{ headerShown: null }} />
        <Stack.Screen name="Plan" component={PlanScreen} options={{ headerShown: null }} />
        <Stack.Screen name="Act" component={ActScreen} options={{ headerShown: null }}/>
        <Stack.Screen name="TaskPrioritization" component={TaskPrioritizationScreen} />
        <Stack.Screen name="Reflect" component={ReflectScreen} options={{ headerShown: null }} />
        <Stack.Screen name="GoalSetting" component={GoalSettingScreen} />
        <Stack.Screen name="AcadStrat" component={AcadStratScreen} options={{ headerTitle: 'Academic Strategies' }} />
        <Stack.Screen name="ASSurvey" component={ASSurvey} options={{ headerTitle: ' Survey' }}/>
        <Stack.Screen name="GWACalc" component={GWACalcScreen} options={{ headerTitle: 'GWA Calculator' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
