import React, { useState, useEffect, useReducer } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; // Importar la funcionalidad de autenticación de Firebase
import '../styles/admin.css';

const firebaseConfig = {
  apiKey: "AIzaSyB5lgnKlzvwUJeoMUvGuhVA3lshzslVod0",
  authDomain: "laura-html.firebaseapp.com",
  projectId: "laura-html",
  storageBucket: "laura-html.appspot.com",
  messagingSenderId: "1011316345123",
  appId: "1:1011316345123:web:513e7c46ae11164d846496",
  measurementId: "G-6BH8RD1SMV"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function reducer(tareas, accion) {
  switch (accion.tipo) {
    case 'agregar':
      return [
        ...tareas,
        {
          id: Date.now(),
          texto: accion.texto,
          completada: false,
          fechaCreacion: new Date().toLocaleString() // Guardar la fecha y hora de creación
        }
      ];
    case 'editar':
      return tareas.map(tarea =>
        tarea.id === accion.id ? { ...tarea, texto: accion.texto } : tarea
      );
    case 'completar':
      return tareas.map(tarea =>
        tarea.id === accion.id ? {
          ...tarea,
          completada: !tarea.completada,
          fechaCompletado: !tarea.completada ? new Date().toLocaleString() : tarea.fechaCompletado // Guardar la fecha y hora de completado
        } : tarea
      );
    case 'eliminar':
      return tareas.filter(tarea => tarea.id !== accion.id);
    default:
      return tareas;
  }
}

function GestionTareasContainer({ onClose }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cuidados, setCuidados] = useState(''); // Nueva variable de estado para los cuidados
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const agregarMichi = () => {
    db.collection("michis").add({
      nombre: nombre,
      descripcion: descripcion,
      cuidados: cuidados, // Agregar el campo de cuidados
      fechaCreacion: new Date().toLocaleString()
    })
      .then(function (docRef) {
        console.log("Nuevo Michi agregado con ID: ", docRef.id);
        setShowSuccessMessage(true);
      })
      .catch(function (error) {
        console.error("Error al agregar nuevo Michi: ", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarMichi();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Agrega un nuevo michi</h2>
        <input type="text" placeholder="Nombre del Michi" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="text" placeholder="Descripción del Michi" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="text" placeholder="Cuidados del Michi" value={cuidados} onChange={(e) => setCuidados(e.target.value)} />
        <button onClick={handleSubmit}>Agregar Michi</button>
        <button onClick={onClose}>Cerrar</button>
        {showSuccessMessage && (
          <div className="success-message">
            ¡Michi agregado con éxito!
          </div>
        )}
      </div>
    </div>
  );
}

function AdminView() {
  const [tareas, dispatch] = useReducer(reducer, [], () => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [texto, setTexto] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(() => {
    return localStorage.getItem('welcomeBackgroundImage') || '';
  });
  const [mostrarGestionMichi, setMostrarGestionMichi] = useState(false);
  const [mostrarSolicitudes, setMostrarSolicitudes] = useState(false);

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBackgroundImage(reader.result);
      localStorage.setItem('welcomeBackgroundImage', reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const agregarTarea = texto => {
    dispatch({ tipo: 'agregar', texto });
    setTexto(''); // Limpiar el campo de texto después de agregar una tarea
  };

  const completarTarea = id => {
    dispatch({ tipo: 'completar', id });
  };

  const eliminarTarea = id => {
    dispatch({ tipo: 'eliminar', id });
  };

  const iniciarEdicion = tarea => {
    setEditandoId(tarea.id);
    setTexto(tarea.texto);
  };

  const toggleGestionMichi = () => {
    setMostrarGestionMichi(!mostrarGestionMichi);
  };

  const toggleMostrarSolicitudes = () => {
    setMostrarSolicitudes(!mostrarSolicitudes);
  };

  const handleCloseGestionMichi = () => {
    setMostrarGestionMichi(false);
  };

  const enviarCorreo = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log("Correo electrónico enviado correctamente");
      })
      .catch((error) => {
        console.error("Error al enviar correo electrónico:", error);
      });
  };
  

  const ListaSolicitudesAdopcion = ({ onClose }) => {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
      const unsubscribe = db.collection("solicitudes_adopcion").onSnapshot((snapshot) => {
        const solicitudesData = [];
        snapshot.forEach((doc) => {
          solicitudesData.push({ id: doc.id, ...doc.data() });
        });
        setSolicitudes(solicitudesData);
      });

      return () => unsubscribe();
    }, []);

    const handleClose = () => {
      onClose();
    };

    return (
      <div className="solicitudes-container">
        <div className="solicitudes-content">
          <h2>Lista de Solicitudes de Adopción</h2>
          <button onClick={handleClose} className="close-btn">Cerrar</button>
          <ul>
            {solicitudes.map(solicitud => (
              <li key={solicitud.id} className="solicitud-item">
                <strong>Nombre:</strong> {solicitud.nombre}<br />
                <strong>Email:</strong> {solicitud.email}<br />
                <strong>Teléfono:</strong> {solicitud.telefono}<br />
                <strong>Número de Adopción:</strong> {solicitud.numeroAdopcion}<br />
                <strong>Motivo:</strong> {solicitud.motivo}<br />
                <button onClick={() => enviarCorreo(solicitud.email)} className="send-email-btn">Enviar mensaje al correo</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const tareasCompletadas = tareas.filter(tarea => tarea.completada);

  return (
    <div className="App">
      <div
        id="welcomeAdminContainer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <p id="welcomeAdminText">Bienvenido Administrador</p>
        <input type="file" onChange={handleImageChange} />
        <form className="task-form">
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Añade una nueva tarea"
            className="task-input"
          />
          <button onClick={() => agregarTarea(texto)}>{editandoId ? 'Guardar Cambios' : 'Agregar'}</button>
        </form>
        <button onClick={toggleGestionMichi}>Gestionar Michis</button>
        <button onClick={toggleMostrarSolicitudes}>Ver Solicitudes de Adopción</button>
        {mostrarSolicitudes && <ListaSolicitudesAdopcion onClose={toggleMostrarSolicitudes} />}
        {mostrarGestionMichi && <GestionTareasContainer onClose={handleCloseGestionMichi} />}
        <div className="task-list">
          {tareas.map(tarea => (
            <div
              key={tarea.id}
              className={`task-item ${tarea.completada ? 'completada' : ''}`}
            >
              <span className="task-text" onClick={() => completarTarea(tarea.id)}>
                {tarea.texto}
              </span>
              <div>
                <small>Creada: {tarea.fechaCreacion}</small>
                {tarea.completada && <small>Completada: {tarea.fechaCompletado}</small>}
              </div>
              <button onClick={() => iniciarEdicion(tarea)} className="task-edit-btn">Editar</button>
              <button onClick={() => eliminarTarea(tarea.id)} className="task-delete-btn">Eliminar</button>
            </div>
          ))}
        </div>
        <div className="completed-tasks">
          <p style={{ fontSize: '30px', color: 'white' }} className="completed-task-text">Tareas Completadas</p>
          <ul className="completed-tasks-list">
            {tareasCompletadas.map(tarea => (
              <li key={tarea.id} className="completed-task-item">
                <span className="completed-task-text">{tarea.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminView;



