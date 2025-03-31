const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Importar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión con MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
});

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Manejar JSON

// Modelo de producto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: String, required: true }, // Nueva propiedad para la categoría
});

const Product = mongoose.model('Product', productSchema);

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a Mokuzai E-commerce!');
});

// Endpoint para obtener productos desde la base de datos
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); // Consultar todos los productos
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

// Endpoint para obtener productos por categoría
app.get('/api/products/:category', async (req, res) => {
    try {
        const { category } = req.params; // Obtener la categoría desde la URL
        const products = await Product.find({ category }); // Filtrar por categoría
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos por categoría' });
    }
});

// Endpoint para agregar un producto
app.post('/api/products', async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body; // Asegurarse de incluir categoría
        const newProduct = new Product({ name, price, description, image, category });
        await newProduct.save(); // Guardar el producto en la base de datos
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
