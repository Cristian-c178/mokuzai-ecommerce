import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1); // Elimina el producto del carrito
        setCart(newCart);
    };

    return (
        <Router>
            <div className="App">
                <Header cart={cart} /> {/* Pasamos el estado del carrito al Header */}
                <Routes>
                    <Route path="/" element={<ProductList addToCart={addToCart} />} />
                    <Route
                        path="/cart"
                        element={<Cart cart={cart} removeFromCart={removeFromCart} />}
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

