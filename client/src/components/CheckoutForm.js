import React, { useState } from 'react';
import './CheckoutForm.css'; // Asegúrate de agregar estilos básicos

const CheckoutForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        direccion: '',
        telefono: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validaciones en tiempo real
        const newErrors = { ...errors };
        if (name === 'email' && !value.includes('@')) {
            newErrors.email = '❌ El correo debe tener "@"';
        } else {
            newErrors.email = '';
        }

        if (name === 'direccion' && value.length < 5) {
            newErrors.direccion = '❌ La dirección debe tener al menos 5 caracteres';
        } else {
            newErrors.direccion = '';
        }

        if (name === 'telefono' && !/^\d+$/.test(value)) {
            newErrors.telefono = '❌ El teléfono debe contener solo números';
        } else {
            newErrors.telefono = '';
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).some(error => error !== '')) {
            alert('Corrige los errores antes de continuar.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="checkout-form">
            <h2>Finalizar compra</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div>
                    <label>Dirección:</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} required />
                    {errors.direccion && <span className="error-message">{errors.direccion}</span>}
                </div>

                <div>
                    <label>Teléfono:</label>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
                    {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                </div>

                <button type="submit">Confirmar pedido</button>
            </form>
        </div>
    );
};

export default CheckoutForm;
