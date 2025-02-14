import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import AppNavigator from './src/navigation/AppNavigator'; // Thay thế cho navigator chính của bạn
import './src/config/firebaseConfig';

const App: React.FC = () => {
  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('FCM Permission granted');
      } else {
        console.log('FCM Permission denied');
      }
    };

    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    const handleBackgroundMessage = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      }
    );

    const onMessage = messaging().onMessage(async (remoteMessage) => remoteMessage);

    requestPermission();
    getToken();

    return () => {
      onMessage();
      handleBackgroundMessage();
    };
  }, []);

  return <AppNavigator />;
};

export default App;
