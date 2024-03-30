// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5lgnKlzvwUJeoMUvGuhVA3lshzslVod0",
  authDomain: "laura-html.firebaseapp.com",
  projectId: "laura-html",
  storageBucket: "laura-html.appspot.com",
  messagingSenderId: "1011316345123",
  appId: "1:1011316345123:web:513e7c46ae11164d846496",
  measurementId: "G-6BH8RD1SMV"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
