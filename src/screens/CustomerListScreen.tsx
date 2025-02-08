import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCustomers } from '../api/customer';

const CustomerListScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomers();
      setCustomers(data.customers);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button title="Logout" onPress={async () => {
        await AsyncStorage.removeItem('accessToken');
        navigation.replace('Login');
      }} />
      {loading ? <ActivityIndicator /> : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.CUSTOMER_CODE}
          renderItem={({ item }) => <Text>{item.CUSTOMER_NAME}</Text>}
        />
      )}
    </View>
  );
};

export default CustomerListScreen;
