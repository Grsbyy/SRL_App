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
import Planner from './screens/PlannerScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import otherScreen from './screens/otherScreen'
import QuizScreen from './screens/QuizScreen';
import PomodoroScreen from './screens/PomodoroScreen'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#353766', // Change header background color
          },
          headerTintColor: 'rgba(255,255,255,0.8)', // Change header text font color
          headerTitleStyle: {
            fontWeight: 'bold', // You can also customize font family, size, etc.
          },
        }}
        >
        <Stack.Screen name="Home" component={Homescreen} options={{ headerShown: null }} />
        <Stack.Screen name="Plan" component={PlanScreen} options={{ headerShown: null }} />
        <Stack.Screen name="Act" component={ActScreen} options={{ headerShown: null }}/>
        <Stack.Screen name="TaskPrioritization" component={TaskPrioritizationScreen} options={{ headerTitle: 'Task Prioritization' }}/>
        <Stack.Screen name="QuizPrio" component={QuizScreen} options={{ headerTitle: 'Quiz Prioritization' }}/>
        <Stack.Screen name="Reflect" component={ReflectScreen} options={{ headerShown: null }} />
        <Stack.Screen name="GoalSetting" component={GoalSettingScreen} options={{ headerTitle: 'Goal Setting' }}/>
        <Stack.Screen name="AcadStrat" component={AcadStratScreen} options={{ headerTitle: 'Academic Strategies'}} />
        <Stack.Screen name="ASSurvey" component={ASSurvey} options={{ headerTitle: ' Survey' }}/>
        <Stack.Screen name="GWACalc" component={GWACalcScreen} options={{ headerTitle: 'GWA Calculator' }} />
        <Stack.Screen name="WPlanner" component={Planner} options={{ headerTitle: 'Weekly Planner' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ headerShown: null }}/>
        <Stack.Screen name="Other" component={otherScreen} options={{ headerTitle: 'Other Strategies' }}/>
        <Stack.Screen name="Pomodoro" component={PomodoroScreen} options={{ headerTitle: 'Pomodoro Screen' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
