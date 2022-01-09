import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBM6PYESQx8UbNNIoY20GezuaKG2coLpTo",
  authDomain: "papaya-49bf4.firebaseapp.com",
  projectId: "papaya-49bf4",
  storageBucket: "papaya-49bf4.appspot.com",
  messagingSenderId: "1098543037896",
  appId: "1:1098543037896:web:60b307354233f57eca14fd",
  measurementId: "G-LPXVC8R3D6",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
