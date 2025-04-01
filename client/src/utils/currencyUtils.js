import axios from 'axios';

// Detectar moneda según ubicación
export const detectCurrency = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        const countryCode = response.data.country_code; // Código del país (ejemplo: "PE")
        
        return countryCode === "PE" ? "PEN" : "USD"; // Si es Perú usa PEN, de lo contrario USD
    } catch (error) {
        console.error('Error al detectar la moneda:', error);
        return "USD"; // Si hay error, usa USD por defecto
    }
};

// Obtener tasa de cambio
export const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
    try {
        const response = await axios.get(`https://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_EXCHANGE_API_KEY}`);
        return response.data.rates[targetCurrency] || 1; // Obtiene el tipo de cambio correcto
    } catch (error) {
        console.error('Error al obtener la tasa de cambio:', error);
        return 1;
    }
};
