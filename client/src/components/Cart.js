import React from 'react';

function Cart({ cart, removeFromCart }) {
    // Función para calcular el total dinámico
    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => sum + (item.price || 0), 0); // Usa directamente el precio
        return total.toFixed(2); // Asegura que el total se muestre con dos decimales
    };

    // Función para finalizar la compra
    const handleCheckout = () => {
        alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
        // Aquí podrías agregar lógica adicional, como limpiar el carrito o redirigir al usuario
    };

    return (
        <div className="container text-center my-4">
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    <ul className="list-group">
                        {cart.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                {item.name}
                                <span className="badge bg-primary rounded-pill">
                                    ${item.price.toFixed(2)} {/* Usa directamente toFixed sin conversión adicional */}
                                </span>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="text-end mt-3">
                        <h5>Total: ${calculateTotal()}</h5>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleCheckout}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
