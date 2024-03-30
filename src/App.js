import React, { useState } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    
    try {
      const docuCifrada = await getDoc(docuRef);

      if (docuCifrada.exists()) {
        const infofinal = docuCifrada.data().rol;
        return infofinal;
      } else {
        console.log("El documento no existe para el UID:", uid);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el rol:", error);
      return null;
    }
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData final", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return <>{user ? <Home user={user} /> : <Login />}</>;
}

export default App;
