/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, Alert } from 'react-native';
import { getCustomers } from '../api/customer';

interface Customer {
  CUSTOMER_ID: number;
  CUSTOMER_CODE: string;
  CUSTOMER_NAME: string;
}

const CustomerListScreen: React.FC<{ token: string | null; onLogout: () => void }> = ({ token, onLogout }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchCustomers();
    }
  }, [token]);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers(token);
      if(response.status === 200){
        setCustomers(response.data.customers);
      }
    } catch (error) {
      Alert.alert('Error fetching customers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 16 }}>
      <Button title="Log out" onPress={onLogout} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Customer List
      </Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.CUSTOMER_ID.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18 }}>{item.CUSTOMER_NAME}</Text>
            <Text style={{ color: 'gray' }}>{item.CUSTOMER_CODE}</Text>
          </View>
        )}
      />
      <Button onPress={fetchCustomers} title="Refresh">Refresh</Button>
    </View>
  );
};

export default CustomerListScreen;
