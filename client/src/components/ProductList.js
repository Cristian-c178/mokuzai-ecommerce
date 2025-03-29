import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]); // Lista completa de productos
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error al cargar productos:', error));
    }, []);

    // Función para eliminar acentos y caracteres especiales
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Filtrar productos basados en el término de búsqueda
    const filteredProducts = products.filter(product =>
        removeAccents(product.name.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase())) ||
        removeAccents(product.description.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase()))
    );

    return (
        <div className="container">
            <h2 className="text-center my-4">Catálogo de Productos</h2>

            {/* Campo de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                />
            </div>

            <div className="row">
                {filteredProducts.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.name}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="fw-bold">${product.price}</p>
                                <button
                                    className="btn btn-success"
                                    onClick={() => addToCart(product)}
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

export default ProductList;
