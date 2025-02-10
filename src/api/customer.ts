import axios from 'axios';

export const getCustomers = async (token: any) => {
  try {
    const response = await axios.get('http://sale.crmviet.vn:8180/crm/api/v1/customers',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
