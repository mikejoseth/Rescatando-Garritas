import React from 'react';
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import '../styles/Home.css';



const auth = getAuth(firebaseApp);

function Home({ user }) {
  return (
    <div id="homeContainer">
      <div id="logoutContainer">
        <button id="cerrarSesionBtn" onClick={() => signOut(auth)}>Cerrar sesión</button>
      </div>

      {user && user.rol === "admin" ? <AdminView /> : <UserView />}
    </div>
  );
}

export default Home;

