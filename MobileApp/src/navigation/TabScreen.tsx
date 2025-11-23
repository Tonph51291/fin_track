import {Platform} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../types/route';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/LoginAndResignter/Login';
import Register from '../screens/LoginAndResignter/Resignter';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function TabScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'fade' : 'none',
        }}
        initialRouteName="UITab">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UITab" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
