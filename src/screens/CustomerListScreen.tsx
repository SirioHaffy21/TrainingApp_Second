/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { getCustomers } from '../api/customer';
import { TextInput } from 'react-native-gesture-handler';

interface Customer {
  CUSTOMER_ID: number;
  CUSTOMER_CODE: string;
  CUSTOMER_NAME: string;
}

const CustomerListScreen: React.FC<{ token: string | null; deviceToken: string | null; onLogout: () => void }> = ({ token, deviceToken, onLogout }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [device_Token, setDeviceToken] = useState<string | null>(null);

  useEffect(() => {
    if (deviceToken) {
      setDeviceToken(deviceToken);
    }
    if (token) {
      fetchCustomers();
    }
  }, [token]);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers(token);
      if(response.status === 200){
        const uniqueCustomers = response.data.customers.filter(
          (customer: Customer, index: number, self: Customer[]) =>
            index === self.findIndex((c) => c.CUSTOMER_ID === customer.CUSTOMER_ID)
        );
        //const uniqueCustomers = Array.from(new Map(response.data.customers.map((customer: Customer) => [customer.CUSTOMER_ID.toString(), customer])).values());
        setCustomers(uniqueCustomers);
      }
    } catch (error) {
      Alert.alert('Error fetching customers');
      Alert.alert(error.toString());
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
      <TextInput value={deviceToken} multiline
        numberOfLines={8} onChangeText={setDeviceToken} style={{ padding: 8, borderWidth: 8, marginBottom: 8 }}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top', // Đảm bảo nội dung bắt đầu từ trên xuống
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CustomerListScreen;
