import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseApp from '../firebase/credenciales';
import '../styles/Login.css';

const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [showTextContainer, setShowTextContainer] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mostrarInfoAdopciones, setMostrarInfoAdopciones] = useState(false);

  const mostrarInfoAdopcionesHandler = () => {
    setMostrarInfoAdopciones(true);
  };

  async function recuperarContraseña(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Correo electrónico de recuperación de contraseña enviado correctamente.");
      // Mostrar mensaje de éxito al usuario
      setErrorMessage("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.");
    } catch (error) {
      console.error("Error al enviar correo electrónico de recuperación de contraseña:", error.message);
      // Manejar el error, por ejemplo, mostrando un mensaje de error al usuario.
      setErrorMessage("Error al enviar correo electrónico de recuperación de contraseña. Por favor, inténtelo de nuevo.");
    }
  }

  async function registrarUsuario(email, password, rol) {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(auth, email, password);
      console.log(infoUsuario.user.uid);

      const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);

      await setDoc(docuRef, { correo: email, rol: rol });

      // Registro exitoso, no es necesario hacer nada más
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // El correo electrónico ya está en uso, mostrar mensaje de error
        console.error("El correo electrónico ya está registrado.");
        setErrorMessage("El correo electrónico ya está registrado.");
      } else {
        // Otro error, mostrar mensaje genérico de error
        console.error("Error al registrar el usuario:", error.message);
        setErrorMessage("Error al registrar el usuario. Por favor, inténtelo de nuevo.");
      }
    }
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol ? e.target.elements.rol.value : null;

    if (isRegistrando) {
      registrarUsuario(email, password, rol);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .catch(error => {
          console.error("Error al iniciar sesión:", error.message);
          setErrorMessage("Correo electrónico o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        });
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTextContainer(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="login-container">
      <div className="form-container">
        <h1>{isRegistrando ? "Registrar Usuario" : "Iniciar Sesión"}</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={submitHandler}>
          <label>
            Correo electrónico:
            <input type="email" id="email" />
          </label>
          <label>
            Contraseña:
            <input type="password" id="password" />
          </label>

          {isRegistrando && (
            <label>
              Rol:
              <select id="rol">
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </label>
          )}

          <input
            type="submit"
            value={isRegistrando ? "Registrar" : "Iniciar sesión"}
          />
        </form>
        <button onClick={() => setIsRegistrando(!isRegistrando)}>
          {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
        </button>

        {!isRegistrando && (
          <button onClick={() => recuperarContraseña(document.getElementById("email").value)}>
            ¿Olvidaste tu contraseña?
          </button>
        )}
      </div>

      <div className="title-container">

  <h2 id="rescatandoGarritas">Rescatando Garritas</h2>

  
</div>
<div class="logo-container">
    <img src={require('../img/pichi.png')} alt="Gatito" className="logo" />
</div>


      <div id='box' className={`text-container ${showTextContainer ? 'show' : ''}`}>
        <h1 className="main-title">Encuentra tu Compañero Peludo</h1>
        <p>
        En Rescatando Garritas, creemos en el poder transformador de la adopción. Cada gato tiene su propia historia, su propio pasado, pero todos comparten un deseo común: ser amados y tener un hogar donde puedan sentirse seguros y queridos. 
        </p>
        <p>
        Cuando eliges adoptar a través de nosotros, no solo estás cambiando la vida de un gato, estás cambiando la tuya también. Estás abriendo tu corazón y tu hogar a un amigo peludo que te brindará compañía, alegría y amor incondicional.
        </p>
        <p>
         
         
        </p>
        <ul className="quote-list">
          <li>Un Hogar es Más Cálido con Patitas Peludas</li>
          <li>Adopta un Ronroneo de Felicidad</li>
          <li>Gatitos: Pequeñas Bolas de Pelusa y Amor</li>
        </ul>

        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
          <button onClick={mostrarInfoAdopcionesHandler}>¿Quieres daber mas sobre nosotros ?</button>
        </div>

        {mostrarInfoAdopciones && (
          <div className="nuevo-contenedor" style={{ width: '100%', height: '170%', color: 'black', fontFamily: 'FENIX' }}>
            <h3>Bienvenido a Rescatando Garritas</h3>
            <h4>Nuestra Historia y Misión.</h4>
            <div className="imagenes-container">
              <img src={require('../img/pichi.png')} alt="Gatito" className="image-redonda-1" />
              <img src={require('../img/tito.jpeg')} alt="Gatito" className="image-redonda-2" />
              <img src={require('../img/re.jpg')} alt="Gatito 3" className="image-redonda-3" />
              <img src={require('../img/re.jpg')} alt="Gatito 3" className="image-redonda-3" />
              <img src={require('../img/re.jpg')} alt="Gatito 3" className="image-redonda-3" />
              <img src={require('../img/re.jpg')} alt="Gatito 3" className="image-redonda-3" />
              <img src={require('../img/re.jpg')} alt="Gatito 3" className="image-redonda-3" />
              <img src={require('../img/re.jpg')} alt="Gatito 3" className="image-redonda-3" />
            </div>
          
         <h4>En Rescatando Garritas, estamos dedicados a salvar y encontrar hogares amorosos para gatos necesitados. Fundada en 2018 por un grupo de amantes de los felinos, nuestra misión es proporcionar una segunda oportunidad a los gatos abandonados, maltratados o en situación de riesgo, conectándolos con familias comprometidas y cariñosas.</h4>
         <h3>Proceso de Adopción</h3>
         <h4>El proceso de adopción en Rescatando Garritas es sencillo y transparente. Los interesados deben seguir estos pasos:</h4>
         <ul className="quote-list">
         <li>1. Explora nuestros gatitos disponibles para adopción en línea.</li>
         <li>2. Completa y envía el formulario de solicitud de adopción.</li>
         <li>3. Programa una visita para conocer al gato en persona.</li>
         <li>4. Si la adopción es aprobada, firma el contrato de adopción y realiza la contribución correspondiente.</li>
         <li>5. ¡Lleva a tu nuevo amigo peludo a casa y bríndale el amor y cuidado que se merece!</li>
        </ul>
        <h3>informacion de contacto</h3>
        <h4>¿Interesado en adoptar o necesitas más información? ¡Contáctanos!</h4>
        <ul className="quote-list">
         <li>- Teléfono: [Número de teléfono]</li>
         <li>- Correo electrónico: [Correo electrónico]</li>
         <li>- Dirección: [Dirección de la ubicación física, si corresponde]</li>
        </ul>
        <h4>
        "La vida se asemeja a un jardín donde cada instante es como una flor única y especial. En nuestra prisa diaria, a menudo pasamos por alto estos pequeños momentos de belleza. Sin embargo, es vital recordar que, al igual que las flores, la vida está llena de ciclos de cambio, crecimiento y renovación"</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
