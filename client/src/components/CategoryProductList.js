import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import './ProductList.css'; // Reutiliza estilos existentes

const CategoryProductList = ({ category, addToCart, currency, exchangeRate }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
    const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llamada al backend para obtener los productos de la categoría seleccionada
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${category}`);
                setProducts(response.data); // Guardar productos en el estado
                setFilteredProducts(response.data); // Inicializa los productos filtrados
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar productos:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    // Filtrar productos al cambiar el término de búsqueda
    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    if (loading) {
        return <p className="text-center">Cargando productos...</p>;
    }

    if (filteredProducts.length === 0) {
        return <p className="text-center">No se encontraron productos en esta categoría.</p>;
    }

    return (
        <div className="container">
            {/* Título refinado */}
            <h2 className="text-center my-4">Productos en {category}</h2>

            {/* Barra de búsqueda */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="row">
                {filteredProducts.map(product => (
                    <div key={product._id} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={product.image || '/images/placeholder.jpg'} // Imagen con estilo moderno
                                className="card-img-top"
                                alt={product.name || 'Sin imagen'}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="fw-bold">
                                    {currency === 'USD'
                                        ? `$${(product.price / exchangeRate).toFixed(2)}`
                                        : `S/${product.price.toFixed(2)}`}
                                </p>
                                <button
                                    className="btn btn-success"
                                    onClick={() => addToCart(product)} // Llama a la función de carrito
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProductList;
