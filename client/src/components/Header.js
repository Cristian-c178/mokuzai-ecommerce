import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cart }) => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white'
        }}>
            {/* Logo y navegación */}
            <div>
                <h1 style={{ margin: 0 }}>Mokuzai</h1>
                <nav>
                    <Link to="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Inicio</Link>
                    <Link to="/products" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Productos</Link>
                    <Link to="/contact" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Contacto</Link>
                </nav>
            </div>

            {/* Ícono del carrito con contador */}
            <div>
                <Link to="/cart" style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1rem'
                }}>
                    <span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '5px' }}>shopping_cart</span>
                    <span style={{
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 8px',
                        fontSize: '0.9rem',
                        marginLeft: '-10px'
                    }}>
                        {cart.length} {/* Contador dinámico */}
                    </span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
