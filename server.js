// server.js
const express = require('express');
const cors = require('cors'); // Importar cors

const app = express();
const PORT = process.env.PORT || 3000; // Usar process.env.PORT para despliegue

app.use(cors()); // Habilitar CORS para todas las solicitudes

// Middleware para manejar JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a Mokuzai E-commerce!');
});

// Endpoint para los productos
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Mesa de madera', price: 120, description: 'Una mesa artesanal de alta calidad.' },
        { id: 2, name: 'Lámpara decorativa', price: 80, description: 'Elegante lámpara de diseño único.' },
        { id: 3, name: 'Estante flotante', price: 50, description: 'Estante funcional hecho a mano.' }
    ];
    res.json(products);
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
