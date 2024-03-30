import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'; 
import '../styles/usu.css';
import catImage1 from '../img/cruela.jpg';
import catImage2 from '../img/hitler.jpg';
import catImage3 from '../img/1.jpeg';
import catImage4 from '../img/-1.jpeg';

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
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [motivo, setMotivo] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [numeroAdopcion, setNumeroAdopcion] = useState(null); 
    const [showAdoptionForm, setShowAdoptionForm] = useState(false);
    const [showCareInfo, setShowCareInfo] = useState(false);
    const [showNewContainer, setShowNewContainer] = useState(false);
    const [currentImage, setCurrentImage] = useState(catImage3);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const numeroAdopcionGenerado = Math.floor(Math.random() * 10000) + 1;

        db.collection("solicitudes_adopcion").add({
            nombre: nombre,
            email: email,
            telefono: telefono,
            motivo: motivo,
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

    const cats = [
        { name: "Ralla", description: "Descripción: Ralla es una pequeña acróbata peluda. Su juego favorito es perseguir juguetes coloridos por toda la casa. Cuando no está jugando, la encontrarás durmiendo plácidamente en su lugar favorito. ¡Esta intrépida amiga hará de tu hogar un lugar lleno de diversión y sueños!", image: catImage1 },
        { name: "Hitler", description: "Descripción: Hitler es una gatita elegante y curiosa con una personalidad tranquila. Le encanta explorar cada rincón de la casa y observar el mundo desde las alturas. A pesar de su nombre, esta gatita es toda dulzura. Con sus 2 años, es la compañera perfecta para charlas tranquilas y momentos relajados.", image: catImage2 },
        { name: "Hitler", description: "Descripción: Hitler es una gatita elegante y curiosa con una personalidad tranquila. Le encanta explorar cada rincón de la casa y observar el mundo desde las alturas. A pesar de su nombre, esta gatita es toda dulzura. Con sus 2 años, es la compañera perfecta para charlas tranquilas y momentos relajados.", image: catImage2 },
        { name: "Hitler", description: "Descripción: Hitler es una gatita elegante y curiosa con una personalidad tranquila. Le encanta explorar cada rincón de la casa y observar el mundo desde las alturas. A pesar de su nombre, esta gatita es toda dulzura. Con sus 2 años, es la compañera perfecta para charlas tranquilas y momentos relajados.", image: catImage2 },
        { name: "Hitler", description: "Descripción: Hitler es una gatita elegante y curiosa con una personalidad tranquila. Le encanta explorar cada rincón de la casa y observar el mundo desde las alturas. A pesar de su nombre, esta gatita es toda dulzura. Con sus 2 años, es la compañera perfecta para charlas tranquilas y momentos relajados.", image: catImage2 },
        { name: "Hitler", description: "Descripción: Hitler es una gatita elegante y curiosa con una personalidad tranquila. Le encanta explorar cada rincón de la casa y observar el mundo desde las alturas. A pesar de su nombre, esta gatita es toda dulzura. Con sus 2 años, es la compañera perfecta para charlas tranquilas y momentos relajados.", image: catImage2 },
        
        // Agrega más gatos aquí
    ];

    return (
        <div>
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
                                    <form className="adoption-form" onSubmit={handleFormSubmit}>
                                        <label htmlFor="nombre">Nombre Completo:</label>
                                        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required /><br />

                                        <label htmlFor="email">Correo Electrónico:</label>
                                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

                                        <label htmlFor="telefono">Teléfono de Contacto:</label>
                                        <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required /><br />

                                        <label htmlFor="motivo">Motivo de Adopción:</label>
                                        <textarea id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} rows="4" required></textarea><br />

                                        <input type="submit" value="Enviar Solicitud" />
                                    </form>
                                    {showSuccessMessage && (
                                        <div className="success-message">
                                            ¡Solicitud enviada con éxito! Número de Adopción: {numeroAdopcion}
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

