const axios = require('axios');

/**
 * @typedef {Object} Cotizacion
 * @property {string} nombre - Nombre de la moneda
 * @property {number} compra - Valor de compra
 * @property {number} venta - Valor de venta
 * @property {string} fechaActualizacion - Fecha de última actualización
 */

/**
 * @typedef {Object} Cotizaciones
 * @property {Cotizacion} USD - Cotización del Dólar
 * @property {Cotizacion} EUR - Cotización del Euro
 * @property {Cotizacion} BRL - Cotización del Real Brasileño
 * @property {Cotizacion} CLP - Cotización del Peso Chileno
 * @property {Cotizacion} UYU - Cotización del Peso Uruguayo
 */

/**
 * @typedef {Object} Dolar
 * @property {string} nombre - Nombre del tipo de dólar
 * @property {number} compra - Valor de compra
 * @property {number} venta - Valor de venta
 * @property {string} fechaActualizacion - Fecha de última actualización
 */

/**
 * @typedef {Object} Dolares
 * @property {Dolar} oficial - Cotización del Dólar Oficial
 * @property {Dolar} blue - Cotización del Dólar Blue
 * @property {Dolar} bolsa - Cotización del Dólar MEP/Bolsa
 * @property {Dolar} contadoconliqui - Cotización del Dólar CCL
 * @property {Dolar} cripto - Cotización del Dólar Cripto
 * @property {Dolar} tarjeta - Cotización del Dólar Tarjeta
 */

/**
 * @typedef {Object} RiesgoPais
 * @property {number} valor - Valor del riesgo país
 * @property {string} fechaActualizacion - Fecha de última actualización
 */

/**
 * Obtiene las cotizaciones de diferentes monedas
 * @returns {Promise<Cotizaciones>}
 */
const getCotizaciones = async () => {
    try {
        const response = await axios.get('https://dolarapi.com/v1/cotizaciones');
        return response.data.reduce((acc, cotizacion) => ({
            ...acc,
            [cotizacion.moneda]: {
                nombre: cotizacion.nombre,
                compra: cotizacion.compra,
                venta: cotizacion.venta,
                fechaActualizacion: cotizacion.fechaActualizacion
            }
        }), {});
    } catch (error) {
        throw new Error('Error al obtener cotizaciones: ' + error.message);
    }
};

/**
 * Obtiene el último valor del riesgo país
 * @returns {Promise<RiesgoPais>}
 */
const getRiesgoPais = async () => {
    try {
        const response = await axios.get('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo');
        return {
            valor: response.data.valor,
            fechaActualizacion: response.data.fecha
        };
    } catch (error) {
        throw new Error('Error al obtener el riesgo país: ' + error.message);
    }
};

/**
 * Obtiene las cotizaciones de los diferentes tipos de dólar
 * @returns {Promise<Dolares>}
 */
const getDolares = async () => {
    try {
        const response = await axios.get('https://dolarapi.com/v1/dolares');
        return response.data.reduce((acc, dolar) => ({
            ...acc,
            [dolar.casa]: {
                nombre: dolar.nombre,
                compra: dolar.compra,
                venta: dolar.venta,
                fechaActualizacion: dolar.fechaActualizacion
            }
        }), {});
    } catch (error) {
        throw new Error('Error al obtener cotizaciones de dólar: ' + error.message);
    }
};

module.exports = {
    getRiesgoPais,
    getDolares,
    getCotizaciones
}; 