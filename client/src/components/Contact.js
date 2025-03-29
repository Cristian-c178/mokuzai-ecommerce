import React from 'react';

const Contact = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Contáctanos</h2>
            <p>Por favor, completa el formulario para contactarnos.</p>
            <form>
                <label>Nombre:</label>
                <input type="text" />
                <br />
                <label>Email:</label>
                <input type="email" />
                <br />
                <label>Mensaje:</label>
                <textarea />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Contact;
