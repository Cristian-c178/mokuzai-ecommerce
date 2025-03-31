import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderNavbar.css'; // Importar la hoja de estilos

const Header = ({ cart }) => {
    return (
        <header className="header">
            {/* Contenedor principal del header */}
            <div className="header-container">
                {/* Nombre centrado */}
                <h1 className="header-title">Mokuzai</h1>

                {/* Carrito centrado en el lado derecho */}
                <Link to="/cart" className="cart-link">
                    <span className="material-icons">shopping_cart</span>
                    <span className="cart-count">{cart.length}</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
