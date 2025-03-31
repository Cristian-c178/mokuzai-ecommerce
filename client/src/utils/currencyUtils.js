import axios from 'axios';

// Detectar moneda según ubicación
export const detectCurrency = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        const currency = response.data.currency; // Código de moneda, por ejemplo: PEN, USD
        return currency || 'USD'; // Retorna la moneda detectada o USD por defecto
    } catch (error) {
        console.error('Error al detectar la moneda:', error);
        return 'USD'; // Moneda predeterminada
    }
};

// Obtener tasa de cambio
export const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
    try {
        const response = await axios.get(`https://api.exchangerate.host/convert?from=${baseCurrency}&to=${targetCurrency}`);
        const rate = response.data.result; // Tasa de cambio actual
        return rate || 1; // Si falla, retorna 1
    } catch (error) {
        console.error('Error al obtener la tasa de cambio:', error);
        return 1; // Tasa por defecto si hay error
    }
};
