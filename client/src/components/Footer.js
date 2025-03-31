import React from 'react';
import './Footer.css'; // Importamos la hoja de estilos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcPaypal, faCcAmex, faWhatsapp, faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Sección de medios de pago */}
                <div className="payment-methods">
                    <h4>Métodos de Pago</h4>
                    <div className="payment-icons">
                        <FontAwesomeIcon icon={faCcVisa} className="icon" />
                        <FontAwesomeIcon icon={faCcMastercard} className="icon" />
                        <FontAwesomeIcon icon={faCcPaypal} className="icon" />
                        <FontAwesomeIcon icon={faCcAmex} className="icon" />
                    </div>
                </div>

                {/* Sección de redes sociales */}
                <div className="social-media">
                    <h4>Redes Sociales</h4>
                    <div className="social-icons">
                    <FontAwesomeIcon icon={faFacebook} className="icon" />
                        <FontAwesomeIcon icon={faWhatsapp} className="icon" />
                        
                        <FontAwesomeIcon icon={faInstagram} className="icon" />
                        <FontAwesomeIcon icon={faTiktok} className="icon" />
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer-copyright">
                    <p>© 2025 Mokuzai E-commerce. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
