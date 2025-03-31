import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderNavbar.css'; // Importar la hoja de estilos

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar el menú desplegable

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li 
                            className="nav-item dropdown"
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <span className="nav-link dropdown-toggle">
                                Productos
                            </span>
                            {dropdownOpen && (
                                <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/products/letreros-led">Letreros Led</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/products/decorativos-mdf">Decorativos MDF</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/products/detalles-sublimados">Detalles Sublimados</Link>
                                </li>
                            </ul>
                            
                            )}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contacto</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
