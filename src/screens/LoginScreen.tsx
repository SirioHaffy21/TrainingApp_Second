/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { login } from '../api/auth';
import CustomerListScreen from './CustomerListScreen';
import messaging from '@react-native-firebase/messaging';

const LoginScreen: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      const tokenDevice = await messaging().getToken();
      setDeviceToken(tokenDevice);
      if (response?.status === 200) {
        setToken(response.data.token);
        setLoggedIn(true);
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Login failed', 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Login
        </Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ padding: 8, borderWidth: 1, marginBottom: 8 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ padding: 8, borderWidth: 1, marginBottom: 8 }}
        />
        <Button onPress={handleLogin} title="Login">Login</Button>
      </View>
    );
  }

  return <CustomerListScreen token={token} deviceToken={deviceToken} onLogout={handleLogout}/>;
};

export default LoginScreen;
