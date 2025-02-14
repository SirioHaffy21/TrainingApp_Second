// src/config/firebaseConfig.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Cấu hình Firebase từ Firebase Console
const firebaseConfig = {
  apiKey: 'nhập api key của project trên firebase',
  authDomain: 'nhập auth domain của project trên firebase',
  projectId: 'nhập project id của project trên firebase',
  storageBucket: 'nhập storage của project trên firebase',
  messagingSenderId: 'nhập messaging sender của project trên firebase',
  appId: 'nhập app Id của project trên firebase',
  measurementId: 'nhập measurement Id của project trên firebase',
};
// Kiểm tra nếu chưa có app nào được khởi tạo thì mới khởi tạo
if (!getApps().length) {
  initializeApp(firebaseConfig);
}else{
    getApps();
}
getFirestore();
getAuth();
