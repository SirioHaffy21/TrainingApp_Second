import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import CustomerListScreen from '../screens/CustomerListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Đăng nhập',headerShown: false }} />
      <Stack.Screen name="CustomerList" component={CustomerListScreen} options={{ title: 'Customers' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
