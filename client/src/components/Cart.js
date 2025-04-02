import React from 'react';
import './Cart.css'; // Importa los estilos refinados
import CheckoutForm from './CheckoutForm'; // Importa el formulario de compra

const Cart = ({ cart, currency, exchangeRate, removeFromCart }) => {
    // Calcular el total del precio de los productos
    const calculateTotal = () => {
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        return currency === 'USD'
            ? `$${(total / exchangeRate).toFixed(2)}`
            : `S/${total.toFixed(2)}`;
    };

    // Redirigir a Mercado Pago después de validar el formulario
    const handleCheckout = (formData) => {
        console.log('✅ Pedido confirmado con estos datos:', formData);
        
        const mercadoPagoURL = "https://link.mercadopago.com.pe/mokuzai"; // Tu link de Mercado Pago
        window.open(mercadoPagoURL, "_blank");
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Carrito de Compras</h2>

            {cart.length === 0 ? (
                <p className="cart-empty">Tu carrito está vacío. ¡Agrega productos para continuar!</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cart.map((product, index) => (
                            <li key={index} className="cart-item">
                                <img
                                    src={product.image || '/images/placeholder.jpg'} // Imagen del producto
                                    alt={product.name || 'Sin imagen'}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h5 className="cart-item-name">{product.name}</h5>
                                    <p className="cart-item-price">
                                        Precio: {currency === 'USD'
                                            ? `$${(product.price / exchangeRate).toFixed(2)}`
                                            : `S/${product.price.toFixed(2)}`}
                                    </p>
                                </div>
                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* 🔹 Sección de validación con CheckoutForm antes de procesar el pago */}
                    <h3>Total: {calculateTotal()}</h3>
                    <CheckoutForm onSubmit={handleCheckout} />
                </div>
            )}
        </div>
    );
};

export default Cart;
