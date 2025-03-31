import React from 'react';
import './SearchBar.css'; // Importa los estilos

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                {/* Icono de lupa */}
                <span className="search-icon material-icons">search</span>

                {/* Campo de entrada */}
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado de búsqueda
                />
            </div>
        </div>
    );
};

export default SearchBar;
