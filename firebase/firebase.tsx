import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDWrWuoEB-9l_CPqQhyDBjy3_guHEJFsoE",
    authDomain: "shaurmagid-af65c.firebaseapp.com",
    projectId: "shaurmagid-af65c",
    storageBucket: "shaurmagid-af65c.appspot.com",
    messagingSenderId: "809042677687",
    appId: "1:809042677687:web:87d8cbcccc651c0597e232",
    measurementId: "G-S9Y764WRCG"
};

const app = initializeApp(firebaseConfig);

// Инициализация Firebase Auth с использованием AsyncStorage для сохранения состояния аутентификации
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Получение объекта Firestore
const db = getFirestore(app);

export { db, auth };