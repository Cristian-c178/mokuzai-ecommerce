import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]); // Lista completa de productos
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [loading, setLoading] = useState(true); // Estado de carga
    const itemsPerPage = 6; // Cantidad de productos por página

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar productos:', error);
                setLoading(false);
            }
        };

        fetchProducts();
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

    // Calcular productos de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generar los números de las páginas
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

            {/* Mensajes de carga y error */}
            {loading ? (
                <p className="text-center">Cargando productos...</p>
            ) : filteredProducts.length === 0 ? (
                <p className="text-center">No se encontraron productos.</p>
            ) : (
                <div className="row">
                    {currentProducts.map(product => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <img
                                    src={product.image || '/images/placeholder.jpg'} // Imagen o marcador de posición
                                    className="card-img-top"
                                    alt={product.name || 'Imagen no disponible'}
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
            )}

            {/* Paginación */}
            {filteredProducts.length > itemsPerPage && (
                <nav>
                    <ul className="pagination justify-content-center">
                        {pageNumbers.map((number) => (
                            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(number)}>
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default ProductList;
