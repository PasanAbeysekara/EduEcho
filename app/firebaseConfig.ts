import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDIHHGmsVqyMD68HWyatZc3yvr5kPFIABI",
  authDomain: "echoedu-9c38d.firebaseapp.com",
  projectId: "echoedu-9c38d",
  storageBucket: "echoedu-9c38d.appspot.com",
  messagingSenderId: "1031120775009",
  appId: "1:1031120775009:web:e918a10a830cab9e4c8720"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
