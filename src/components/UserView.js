import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'; 
import '../styles/usu.css';
import catImage1 from '../img/cruela.jpg';
import catImage2 from '../img/hitler.jpg';
import catImage3 from '../img/1.jpeg';
import catImage4 from '../img/-1.jpeg';
import catImage5 from '../img/fores.png';
import catImage6 from '../img/picachu.png';
import catImage7 from '../img/sol.png';
import catImage8 from '../img/cachetes.png';
import eyImage from '../img/ey.png';

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

function UserView() {
    const [cats, setCats] = useState([
        { 
            name: "Ralla", 
            description: "Ralla es una pequeña acróbata peluda. Su juego favorito es perseguir juguetes coloridos por toda la casa. Cuando no está jugando, la encontrarás durmiendo plácidamente en su lugar favorito. ¡Esta intrépida amiga hará de tu hogar un lugar lleno de diversión y sueños!", 
            image: catImage1,
            form: {
                nombre: '',
                email: '',
                telefono: '',
                motivo: ''
            }
        },
        { 
            name: "timoti", 
            description: "Timoti es un pequeño corredor peluda. Su juego favorito es perseguir juguetes coloridos por toda la casa. Cuando no está jugando, la encontrarás durmiendo plácidamente en su lugar favorito. ¡Esta intrépida amiga hará de tu hogar un lugar lleno de diversión y sueños!", 
            image: catImage5,
            form: {
                nombre: '',
                email: '',
                telefono: '',
                motivo: ''
            }
        },
        { 
            name: "julith", 
            description: "julieth es una pequeña acróbata peluda. Su juego favorito es perseguir juguetes coloridos por toda la casa. Cuando no está jugando, la encontrarás durmiendo plácidamente en su lugar favorito. ¡Esta intrépida amiga hará de tu hogar un lugar lleno de diversión y sueños!", 
            image: catImage6,
            form: {
                nombre: '',
                email: '',
                telefono: '',
                motivo: ''
            }
        },
        { 
            name: "sol", 
            description: "sol es una pelietas  peluda. Su juego favorito es perseguir juguetes coloridos por toda la casa. Cuando no está jugando, la encontrarás durmiendo plácidamente en su lugar favorito. ¡Esta intrépida amiga hará de tu hogar un lugar lleno de diversión y sueños!", 
            image: catImage7,
            form: {
                nombre: '',
                email: '',
                telefono: '',
                motivo: ''
            }
        },
        { 
            name: "cachetes", 
            description: "cachetes un destructor de mundos . Su juego favorito es perseguir juguetes coloridos por toda la casa. Cuando no está jugando, la encontrarás durmiendo plácidamente en su lugar favorito. ¡Esta intrépida amiga hará de tu hogar un lugar lleno de diversión y sueños!", 
            image: catImage8,
            form: {
                nombre: '',
                email: '',
                telefono: '',
                motivo: ''
            }
        },

        { 
            name: "Hitler", 
            description: "Descripción:Hitler es una gatita elegante y curiosa con una personalidad tranquila. Le encanta explorar cada rincón de la casa y observar el mundo desde las alturas. A pesar de su nombre, esta gatita es toda dulzura. Con sus 2 años, es la compañera perfecta para charlas tranquilas y momentos relajados. .", 
            image: catImage2,
            form: {
                nombre: '',
                email: '',
                telefono: '',
                motivo: ''
            }
        }
        
        
    ]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [numeroAdopcion, setNumeroAdopcion] = useState(null); 
    const [showAdoptionForm, setShowAdoptionForm] = useState(false);
    const [showCareInfo, setShowCareInfo] = useState(false);
    const [showNewContainer, setShowNewContainer] = useState(false);
    const [currentImage, setCurrentImage] = useState(catImage3);

    const handleFormSubmit = (event, index) => {
        event.preventDefault();

        const numeroAdopcionGenerado = Math.floor(Math.random() * 10000) + 1;

        db.collection("solicitudes_adopcion").add({
            nombre: cats[index].form.nombre,
            email: cats[index].form.email,
            telefono: cats[index].form.telefono,
            motivo: cats[index].form.motivo,
            numeroAdopcion: numeroAdopcionGenerado
        })
        .then(function(docRef) {
            console.log("Solicitud de adopción registrada con ID: ", docRef.id);
            setShowSuccessMessage(true);
            setNumeroAdopcion(numeroAdopcionGenerado);
        })
        .catch(function(error) {
            console.error("Error al registrar la solicitud de adopción: ", error);
        });
    };

    const handleAdoptButtonClick = () => {
        setShowAdoptionForm(true);
        setShowCareInfo(false);
        setShowNewContainer(false);
    };

    const handleCareInfoButtonClick = () => {
        setShowCareInfo(true);
        setShowAdoptionForm(false);
        setShowNewContainer(false);
    };

    const handleShowNewContainerClick = () => {
        setShowNewContainer(!showNewContainer);
    };

    const handleImageClick = () => {
        setCurrentImage(currentImage === catImage3 ? catImage4 : catImage3);
    };

    const handleNombreChange = (index, value) => {
        const updatedCats = [...cats];
        updatedCats[index].form.nombre = value;
        setCats(updatedCats);
    };

    const handleEmailChange = (index, value) => {
        const updatedCats = [...cats];
        updatedCats[index].form.email = value;
        setCats(updatedCats);
    };

    const handleTelefonoChange = (index, value) => {
        const updatedCats = [...cats];
        updatedCats[index].form.telefono = value;
        setCats(updatedCats);
    };

    const handleMotivoChange = (index, value) => {
        const updatedCats = [...cats];
        updatedCats[index].form.motivo = value;
        setCats(updatedCats);
    };

    return (
        <div>
            <div class="f">
                <img src={require('../img/logo2.png')} alt="Gatito" />
            </div>
            <div id="backgroundImageContainer"></div>
            <div id="adoptTextContainer">
                <h1 id="adoptText">Adopta</h1>
                {cats.map((cat, index) => (
                    <div key={index} className="cat-container">
                        <div className="cat-image-container">
                            <img src={cat.image} alt={`Cute Cat ${cat.name}`} className="cat-image"/>
                        </div>
                        <div className="cat-info-container">
                            <div className="cat-info">
                                <h2>{cat.name}</h2>
                                <p>{cat.description}</p>
                            </div>
                            <button className="adopt-button" onClick={handleAdoptButtonClick}>
                                Adóptame
                            </button>
                            <button className="care-info-button" onClick={handleCareInfoButtonClick}>
                                Cuidados únicos
                            </button>
                            <button className="show-new-container-button" onClick={handleShowNewContainerClick}>
                                Mira
                            </button>
                            {showAdoptionForm && (
                                <div className={`adoption-form-container ${showAdoptionForm ? 'active' : ''}`}>
                                    <form className="adoption-form" onSubmit={(event) => handleFormSubmit(event, index)}>
                                        <label htmlFor="nombre">Nombre Completo:</label>
                                        <input type="text" id="nombre" value={cat.form.nombre} onChange={(e) => handleNombreChange(index, e.target.value)} required /><br />

                                        <label htmlFor="email">Correo Electrónico:</label>
                                        <input type="email" id="email" value={cat.form.email} onChange={(e) => handleEmailChange(index, e.target.value)} required /><br />

                                        <label htmlFor="telefono">Teléfono de Contacto:</label>
                                        <input type="tel" id="telefono" value={cat.form.telefono} onChange={(e) => handleTelefonoChange(index, e.target.value)} required /><br />

                                        <label htmlFor="motivo">Motivo de Adopción:</label>
                                        <textarea id="motivo" value={cat.form.motivo} onChange={(e) => handleMotivoChange(index, e.target.value)} rows="4" required></textarea><br />

                                        <input type="submit" value="Enviar Solicitud" />
                                    </form>
                                    {showSuccessMessage && (
                                        <div className="success-message">
                                            ¡Solicitud enviada con éxito! Número de Adopción: {numeroAdopcion}
                                            <img src={eyImage} alt="Ey" />
                                        </div>
                                    )}
                                    
                                </div>
                            )}
                              

                            {showCareInfo && (
                                <div className="care-info-container">
                                    <h2 style={{ fontFamily: 'ADLaM Display, sans-serif', fontSize: '1.5em', fontWeight: 'bold' }}>
                                        Cuidados Esenciales para tu Gato
                                    </h2>
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        <li style={{ fontFamily: 'ADLaM Display, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>
                                            <strong>1. Alimentación Equilibrada:</strong> Ofrece comida adecuada y consulta al veterinario para porciones.
                                        </li>
                                        <li style={{ fontFamily: 'ADLaM Display, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>
                                            <strong>2. Agua Fresca Siempre:</strong> Asegúrate de acceso constante a agua limpia.
                                        </li>
                                        <li style={{ fontFamily: 'ADLaM Display, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>
                                            <strong>3. Visitas Veterinarias:</strong> Chequeos periódicos para mantener su salud.
                                        </li>
                                        <li style={{ fontFamily: 'ADLaM Display, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>
                                            <strong>4. Aseo Regular:</strong> Cepillado y corte de uñas según sea necesario.
                                        </li>
                                        <li style={{ fontFamily: 'ADLaM Display, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>
                                            <strong>5. Tiempo de Juego y Afecto:</strong> Dedica tiempo diario para interactuar y acariciar.
                                        </li>
                                    </ul>
                                    <button style={{ fontFamily: 'ADLaM Display, sans-serif', fontSize: '1em' }} onClick={() => setShowCareInfo(false)}>
                                        Cerrar
                                    </button>
                                </div>
                            )}

                            {showNewContainer && (
                                <div className="new-container">
                                    <h2>solo piensa en todas las aventuras</h2>
                                    <div className="image-gallery">
                                        <img src={currentImage} alt="Imagen" className="gallery-image" onClick={handleImageClick} />
                                        <img src={currentImage} alt="Imagen" className="gallery-image" onClick={handleImageClick} />
                                        <img src={currentImage} alt="Imagen" className="gallery-image" onClick={handleImageClick} />
                                        <img src={currentImage} alt="Imagen" className="gallery-image" onClick={handleImageClick} />
                                        <img src={currentImage} alt="Imagen" className="gallery-image" onClick={handleImageClick} />
                                        <img src={currentImage} alt="Imagen" className="gallery-image" onClick={handleImageClick} />
                                        <img src={currentImage} alt="Imagen" className="gallery-image" onClick={handleImageClick} />
                                        <img src={currentImage} alt="Imagen" className="gallery-image" onClick={handleImageClick} />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserView;

