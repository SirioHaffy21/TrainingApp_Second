import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/auth';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = await login(username, password);
    if (data.accessToken) {
      await AsyncStorage.setItem('accessToken', data.accessToken);
      navigation.replace('CustomerList');
    } else {
      Alert.alert('Login failed', 'Invalid credentials');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, padding: 5 }} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 5 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
