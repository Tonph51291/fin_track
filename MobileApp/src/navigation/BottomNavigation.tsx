import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabar from './CustomTabar';
import HomeScreen from '../screens/Home/HomeScreen';
import MyCard from '../screens/MyCard/MyCard';
import Static from '../screens/Static/Static';
import Setting from '../screens/Setting/Setting';
const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Card" component={MyCard} />
      <Tab.Screen name="Statistics" component={Static} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
