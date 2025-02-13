// src/config/firebaseConfig.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Cấu hình Firebase từ Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyAQA5KHrDICXTcyy0KDPn9Ti2ceOR-ravI',
  authDomain: 'trainingapp-second.firebaseapp.com',
  projectId: 'trainingapp-second',
  storageBucket: 'trainingapp-second.firebasestorage.app',
  messagingSenderId: '978486856841',
  appId: '1:978486856841:android:2e63bb522bdcac394f8a58',
  measurementId: 'G-P7W9EVH4Q7',
};

// Kiểm tra nếu chưa có app nào được khởi tạo thì mới khởi tạo
if (!getApps().length) {
  initializeApp(firebaseConfig);
}else{
    getApps();
}
getFirestore();
getAuth();
