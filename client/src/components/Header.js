import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderNavbar.css'; // Importar la hoja de estilos

const Header = ({ cart, currency, handleCurrencyChange }) => {
    return (
        <header className="header">
            {/* Contenedor principal del header */}
            <div className="header-container">
                {/* Nombre centrado */}
                <h1 className="header-title">Mokuzai</h1>

                {/* Seleccionar moneda */}
                <div className="currency-selector">
                    <label htmlFor="currency" className="currency-label">Moneda:</label>
                    <select
                        id="currency"
                        value={currency}
                        onChange={(e) => handleCurrencyChange(e.target.value)}
                        className="currency-select"
                    >
                        <option value="PEN">Soles (S/)</option>
                        <option value="USD">Dólares ($)</option>
                    </select>
                </div>

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
