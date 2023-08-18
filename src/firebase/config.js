// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 인증 기능
import { getAuth } from "firebase/auth";
// 데이터베이스
import { Timestamp, getFirestore } from "firebase/firestore";
// 저장소
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 사용자 인증
const appAuth = getAuth(app);

// 데이터베이스
const appFireStore = getFirestore(app);
const timestamp = Timestamp;

// 파일 업로드
const appStorage = getStorage(app);

// 외부에서 활용하도록 내보냄
export { appAuth, appFireStore, appStorage, timestamp };
