#!/usr/bin/env node

const https = require('https');
const chalkPromise = import('chalk');
const Table = require('cli-table3');
const ProgressBar = require('progress');

chalkPromise.then(chalk => {
    const fetchDolarCotizaciones = () => {
        https.get('https://dolarapi.com/v1/dolares', (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const dolarData = JSON.parse(data);
                const table = new Table({
                    head: [
                        chalk.default.yellow('Moneda'),
                        chalk.default.yellow('Compra'),
                        chalk.default.yellow('Venta'),
                        chalk.default.yellow('Última Actualización'),
                        chalk.default.yellow('Últ. Act. Hace') // Última actualización abreviada
                    ],
                    colWidths: [20, 15, 15, 35, 20], // Ajustar el ancho de las columnas para acomodar la nueva columna
                    style: {
                        head: [],
                        border: [''],
                        'padding-left': 2,
                        'padding-right': 1,
                        compact: true,
                        align: ['left', 'right', 'right', 'left', 'left'] // Alineación de la nueva columna a la izquierda
                    }
                });

                // Función para obtener el emoji adecuado según el nombre de la moneda
                const getEmojiForCurrency = (currencyName) => {
                    switch (currencyName.toLowerCase()) {
                        case 'oficial':
                            return '💵'; // Emoji de dólar
                        case 'blue':
                            return '💶'; // Emoji de euro
                        case 'bolsa':
                            return '👜'; // Emoji de bolsa
                        case 'cripto':
                            return '⚡'; // Emoji de rayo
                        case 'tarjeta':
                            return '💳'; // Emoji de tarjeta
                        case 'contado':
                            return '💸'; // Emoji de billetes
                        default:
                            return '💰'; // Emoji genérico de dinero
                    }
                };

                dolarData.forEach(item => {
                    const emoji = getEmojiForCurrency(item.nombre);
                    const compraFormatted = `$${parseFloat(item.compra).toFixed(1)}`;
                    const ventaFormatted = `$${parseFloat(item.venta).toFixed(1)}`;

                    // Calcular el tiempo pasado desde la última actualización
                    const lastUpdateDate = new Date(item.fechaActualizacion);
                    const now = new Date();
                    const timeDiff = Math.abs(now - lastUpdateDate);
                    const minutesPassed = Math.floor(timeDiff / (1000 * 60)); // Convertir diferencia de tiempo en minutos

                    table.push([
                        chalk.default.cyan(`${emoji} ${item.nombre}`),
                        chalk.default.green(compraFormatted),
                        chalk.default.red(ventaFormatted),
                        chalk.default.white(item.fechaActualizacion),
                        chalk.default.magenta(`${minutesPassed} min`) // Agregar el tiempo pasado con el formato deseado
                    ]);
                });

                console.clear();
                console.log(table.toString());
                bar.tick(60);
                if (bar.complete) {
                    bar = new ProgressBar('⏱️  :bar', {
                        total: 60,
                        width: 107,
                        complete: '█',
                        incomplete: '░',
                        clear: true,
                        renderThrottle: 100,
                        clear: true
                    });
                }
            });

        }).on("error", (err) => {
            console.error(chalk.default.red('Error al obtener las cotizaciones del dólar: ' + err.message));
        });
    };

    // Verificar si se pasó alguno de los flags para actualización en vivo
    const args = process.argv.slice(2);
    const liveUpdate = args.includes('-w') || args.includes('--watch') || args.includes('-l') || args.includes('--live');

    let bar = new ProgressBar('⏱️  :bar', {
        total: 60,
        width: 107,
        complete: '█',
        incomplete: '░',
        clear: true,
        renderThrottle: 100,
    });

    if (liveUpdate) {
        // Llamar a fetchDolarCotizaciones cada minuto
        setInterval(fetchDolarCotizaciones, 60000);
        setInterval(() => {
            if (!bar.complete) {
                bar.tick();
            }
        }, 1000);
    }

    // Llamar inicialmente a la función
    fetchDolarCotizaciones();
});