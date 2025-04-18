// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHMxbuTzFt-PQoZ7kRqrxkEj9JwtnNN18",
  authDomain: "meorganiza-2b8f4.firebaseapp.com",
  projectId: "meorganiza-2b8f4",
  storageBucket: "meorganiza-2b8f4.firebasestorage.app",
  messagingSenderId: "61132077995",
  appId: "1:61132077995:web:a21d3f28709cc7b1abf0ee",
  measurementId: "G-BEDMMFEDB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally (apenas em ambiente de navegador)
let analytics = null;
if (typeof window !== 'undefined') {
  // Verifica se o analytics é suportado antes de inicializar
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(err => {
    console.error("Erro ao verificar suporte do Analytics:", err);
  });
}

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };
export default app;
