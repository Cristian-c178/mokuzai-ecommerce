const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Importar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Verificar si MONGO_URI está definida correctamente
if (!process.env.MONGO_URI) {
    console.error("❌ Error: La variable MONGO_URI no está definida.");
    process.exit(1); // Detiene el proceso si falta la configuración
}

// Conexión con MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`✅ Conectado a MongoDB`))
.catch((err) => {
    console.error('❌ Error al conectar a MongoDB:', err.message);
});

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://mokuzai.store", "https://mokuzai-ecommerce.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json()); // Manejar JSON

// Modelo de producto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a Mokuzai E-commerce!');
});

// Endpoint para obtener productos desde la base de datos con manejo de errores detallado
app.get('/api/products', async (req, res) => {
    try {
        const { category } = req.query; // Cambio para manejar categorías con query parameters
        const products = category ? await Product.find({ category }) : await Product.find();

        if (products.length === 0) {
            return res.status(404).json({ message: `No se encontraron productos${category ? ` en la categoría '${category}'` : ''}` });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error en /api/products:", error.message);
        res.status(500).json({ message: "Error interno en el servidor", error: error.message });
    }
});

// Endpoint para agregar un producto con validación
app.post('/api/products', async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;

        if (!name || !price || !description || !category) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newProduct = new Product({ name, price, description, image, category });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("❌ Error en /api/products (POST):", error.message);
        res.status(500).json({ message: "Error al agregar el producto", error: error.message });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
