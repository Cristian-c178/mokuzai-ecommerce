import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ addToCart, currency }) => {
    const [products, setProducts] = useState([]); // Lista completa de productos
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 6; // Cantidad de productos por página

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products?category=letreros-led`);
                setProducts(response.data);
            } catch (error) {
                console.error("❌ Error al cargar productos:", error);
            }
        };

        fetchProducts();
    }, []);

    // Filtrar productos basados en el término de búsqueda
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

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
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Listado de productos */}
            <div className="row">
                {currentProducts.map(product => (
                    <div key={product._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img src={product.image || '/images/placeholder.jpg'} className="card-img-top" alt={product.name} />
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                {/* Precios que cambian según la moneda seleccionada */}
                                <p className="fw-bold">
    {currency === "USD" 
        ? `$${Number(product.price).toFixed(2)}` 
        : `S/ ${(Number(product.price) * 3.8).toFixed(2)}`
    }
</p>

                                <button className="btn btn-success" onClick={() => addToCart(product)}>Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
