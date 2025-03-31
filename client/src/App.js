import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { detectCurrency, fetchExchangeRate } from './utils/currencyUtils'; // Importar funciones de utilidad
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Página de inicio con el carrusel
import Footer from './components/Footer';
import Cart from './components/Cart';
import Testimonials from './components/Testimonials';
import CategoryProductList from './components/CategoryProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Testimonials.css';

const App = () => {
    const [cart, setCart] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false); // Controlar el chat flotante
    const [message, setMessage] = useState(''); // Capturar el mensaje del usuario
    const [currency, setCurrency] = useState('USD'); // Moneda por defecto
    const [exchangeRate, setExchangeRate] = useState(1); // Tasa de cambio por defecto

    // Función para inicializar la detección de moneda y tasa de cambio
    useEffect(() => {
        const initializeCurrency = async () => {
            const detectedCurrency = await detectCurrency(); // Detecta la moneda del usuario
            setCurrency(detectedCurrency);

            if (detectedCurrency !== 'USD') {
                const rate = await fetchExchangeRate(detectedCurrency, 'USD');
                setExchangeRate(rate);
            }
        };

        initializeCurrency();
    }, []);

    // Cambiar moneda manualmente
    const handleCurrencyChange = async (newCurrency) => {
        setCurrency(newCurrency);
        if (newCurrency !== 'USD') {
            const rate = await fetchExchangeRate(newCurrency, 'USD');
            setExchangeRate(rate);
        } else {
            setExchangeRate(1); // USD a USD no requiere conversión
        }
    };

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
                <Header
                    cart={cart}
                    currency={currency}
                    handleCurrencyChange={handleCurrencyChange} // Pasa la función de cambio de moneda
                />
                <Navbar />

                <main>
                    <Routes>
                        {/* Página de inicio con Testimonials */}
                        <Route path="/" element={
                            <>
                                <Home />
                                <Testimonials />
                            </>
                        } />

                        {/* Redirección desde /products */}
                        <Route path="/products" element={<Navigate to="/products/letreros-led" />} />

                        <Route
                            path="/cart"
                            element={<Cart
                                cart={cart}
                                removeFromCart={removeFromCart}
                                currency={currency}
                                exchangeRate={exchangeRate} // Pasa la tasa de cambio
                            />}
                        />
                        <Route path="/contact" element={<h1>Página de Contacto</h1>} />

                        {/* Rutas específicas para categorías */}
                        <Route
                            path="/products/letreros-led"
                            element={<CategoryProductList
                                category="letreros-led"
                                addToCart={addToCart}
                                currency={currency}
                                exchangeRate={exchangeRate} // Pasa la tasa de cambio
                            />}
                        />
                        <Route
                            path="/products/decorativos-mdf"
                            element={<CategoryProductList
                                category="decorativos-mdf"
                                addToCart={addToCart}
                                currency={currency}
                                exchangeRate={exchangeRate}
                            />}
                        />
                        <Route
                            path="/products/detalles-sublimados"
                            element={<CategoryProductList
                                category="detalles-sublimados"
                                addToCart={addToCart}
                                currency={currency}
                                exchangeRate={exchangeRate}
                            />}
                        />
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

                        {/* Opciones flotantes */}
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

                        {/* Área de texto para escribir mensajes */}
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
