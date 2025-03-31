import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Página de inicio con el carrusel
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Testimonials from './components/Testimonials'; // Importar el componente Testimonials
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Testimonials.css'; // Archivo CSS para los estilos

const App = () => {
    const [cart, setCart] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false); // Controlar el chat flotante
    const [message, setMessage] = useState(''); // Capturar el mensaje del usuario

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1); // Elimina el producto del carrito
        setCart(newCart);
    };

    // Función para abrir/cerrar el chat flotante
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Función para redirigir a WhatsApp con el mensaje
    const sendMessage = () => {
        const whatsappURL = `https://wa.me/+51987847321?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
        setMessage(''); // Limpia el campo de texto
    };

    return (
        <Router>
            <div className="App">
                <Header cart={cart} />
                <Navbar />

                <main>
                    <Routes>
                        {/* Página de inicio: Incluye Testimonials */}
                        <Route path="/" element={
                            <>
                                <Home /> 
                                <Testimonials /> {/* Agregar Testimonios aquí */}
                            </>
                        } />
                        <Route path="/products" element={<ProductList addToCart={addToCart} />} />
                        <Route
                            path="/cart"
                            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
                        />
                        <Route path="/contact" element={<h1>Página de Contacto</h1>} />
                    </Routes>
                </main>

                <Footer />

                {/* Botón flotante de WhatsApp */}
                <div className="whatsapp-button" onClick={toggleChat}>
                    <FontAwesomeIcon icon={faWhatsapp} className="icon" />
                </div>

                {/* Chat flotante */}
                {isChatOpen && (
                    <div className="chat-box open-animation">
                        <p className="welcome-message">¡Hola! ¿En qué podemos ayudarte?</p>
                        
                        {/* Opciones flotantes separadas */}
                        <div className="options-container">
                            <button onClick={() => setMessage("Hola, estoy interesado en este producto")}>
                                Hola, estoy interesado en este producto
                            </button>
                            <button onClick={() => setMessage("Tengo una duda acerca de este producto")}>
                                Tengo una duda acerca de este producto
                            </button>
                            <button onClick={() => setMessage("¿Podrías enviarme más información?")}>
                                ¿Podrías enviarme más información?
                            </button>
                        </div>

                        {/* Área de texto para escribir mensajes personalizados */}
                        <textarea
                            placeholder="Escribe tu mensaje..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>

                        {/* Botón para enviar */}
                        <button onClick={sendMessage}>Enviar</button>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;
