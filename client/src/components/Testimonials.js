import React from 'react';
import './Testimonials.css'; // Archivo CSS para los estilos

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Juan Pérez',
            text: '¡Productos increíbles y atención de primera!',
        },
        {
            name: 'Ana Gómez',
            text: 'Rápido envío y precios excelentes. ¡Muy recomendado!',
        },
        {
            name: 'Carlos Fernández',
            text: 'La mejor experiencia de compra en línea que he tenido.',
        },
    ];

    return (
        <section className="testimonials">
            <h2 className="testimonials-title">Qué dicen nuestros clientes</h2>
            <div className="testimonial-cards">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                        {/* Eliminamos la imagen, pero puedes agregar un ícono o dejar un color de fondo */}
                        <div className="testimonial-placeholder">
                            {testimonial.name.charAt(0)} {/* Inicial del nombre */}
                        </div>
                        <p className="testimonial-text">"{testimonial.text}"</p>
                        <h3 className="testimonial-name"> {testimonial.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
