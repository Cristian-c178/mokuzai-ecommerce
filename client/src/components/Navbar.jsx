import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeaderNavbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú principal
    const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para el menú de productos
    const [isSticky, setIsSticky] = useState(false); // Estado para navbar fijo al hacer scroll

    // Detectar scroll y fijar navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50); // Se vuelve "pegajoso" después de 50px de scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Función para cerrar todo cuando se selecciona una opción
    const closeMenu = () => {
        setMenuOpen(false);
        setDropdownOpen(false); // Cierra también el dropdown
    };

    return (
        <nav className={`navbar navbar-expand-lg ${isSticky ? "sticky-navbar" : ""}`}>
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                        setDropdownOpen(false); // Cierra el dropdown al abrir el navbar
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={closeMenu}>Inicio</Link>
                        </li>

                        {/* Menú desplegable de Productos */}
                        <li className="nav-item dropdown"
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <button className="nav-link dropdown-toggle">
                                Productos
                            </button>

                            {dropdownOpen && (
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/products/letreros-led" onClick={closeMenu}>Letreros Led</Link></li>
                                    <li><Link className="dropdown-item" to="/products/decorativos-mdf" onClick={closeMenu}>Decorativos MDF</Link></li>
                                    <li><Link className="dropdown-item" to="/products/detalles-sublimados" onClick={closeMenu}>Detalles Sublimados</Link></li>
                                </ul>
                            )}
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact" onClick={closeMenu}>Contacto</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
