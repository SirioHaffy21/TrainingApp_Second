import CryptoJS from 'crypto-js';
import { Alert } from 'react-native';
import axios from 'axios';


export const login = async (username: string, password: string) => {
  try{
    const encryptPassword = CryptoJS.MD5(password).toString();
    const response = await axios.post('http://sale.crmviet.vn:8180/crm/api/v1/login', { username: username, password: encryptPassword });
    return response;
  }catch(error){
    //throw error;
    Alert.alert('Login failed -1', error.toString());
  }
};
