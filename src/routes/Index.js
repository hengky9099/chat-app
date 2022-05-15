import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from '../screen/login/Index';
import Register from '../screen/register/Index';
import Dashboard from '../screen/dashboard/Index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
      //   options={{
      //     tabBarLabel: ({focused, color}) => (
      //       <Text style={{color: focused ? 'red' : 'black'}}>Google Map</Text>
      //     ),
      //     tabBarIcon: ({focused, color}) => (
      //       <Icon name="place" size={24} color={focused ? 'red' : 'black'} />
      //     ),
      //   }}
      //   name="Map"
      //   component={Map}
      />
    </Tab.Navigator>
  );
};

export default Stacks;

const styles = StyleSheet.create({});
