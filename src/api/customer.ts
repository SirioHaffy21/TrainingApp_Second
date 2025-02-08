import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCustomers = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await fetch('https://sale.crmviet.vn:8444/crm/api/v1/customers', {
    headers: { Authorization: `Bearer ${token}` },
    method: 'GET',
  });
  return response.json();
};
