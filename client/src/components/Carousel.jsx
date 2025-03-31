import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderNavbar.css'; // Importamos la hoja de estilos

const Carousel = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide carousel-container" data-bs-ride="carousel">
            {/* Indicadores */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            
            {/* Imágenes del carrusel */}
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                    <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRpc2UlQzMlQjFvJTIwd2VifGVufDB8fDB8fHww" className="d-block w-100" alt="Promoción 1" />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img src="https://www.marketingdirecto.com/wp-content/uploads/2022/10/Diseno-web.jpg" className="d-block w-100" alt="Promoción 2" />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img src="https://www.comunicare.es/wp-content/uploads/2021/03/1778829c66b7800a38a5c6ec92827c482fc056cb-4.jpeg" className="d-block w-100" alt="Promoción 3" />
                </div>
            </div>
            
            {/* Botón Anterior */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            
            {/* Botón Siguiente */}
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;


