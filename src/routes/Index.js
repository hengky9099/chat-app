import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Login from '../screen/login/Index';
import Register from '../screen/register/Index';
import Dashboard from '../screen/dashboard/Index';
import Chat from '../screen/chat/Index';
import AllUser from '../screen/alluser/Index';
import Profile from '../screen/profile/Index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Stacks = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = useCallback(
    userData => {
      setUser(userData);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={user ? 'Dashboard' : 'Login'}>
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
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllUser"
        component={AllUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
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
