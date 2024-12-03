#!/usr/bin/env node

const https = require('https');
const chalkPromise = import('chalk');
const Table = require('cli-table3');
const ProgressBar = require('progress');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

chalkPromise.then(chalk => {
    const fetchDolarCotizaciones = () => {
        https.get('https://dolarapi.com/v1/dolares', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const dolarData = JSON.parse(data);
                const table = new Table({
                    head: [
                        chalk.default.yellow('Moneda'),
                        chalk.default.yellow('Compra'),
                        chalk.default.yellow('Venta'),
                        chalk.default.yellow('Última Actualización'),
                        chalk.default.yellow('Últ. Act. Hace')
                    ],
                    colWidths: [20, 15, 15, 35, 20],
                    style: {
                        head: [],
                        border: [''],
                        'padding-left': 2,
                        'padding-right': 1,
                        compact: true,
                        align: ['left', 'right', 'right', 'left', 'left']
                    }
                });

                const getEmojiForCurrency = (currencyName) => {
                    switch (currencyName.toLowerCase()) {
                        case 'oficial':
                            return '💵';
                        case 'blue':
                            return '💶';
                        case 'bolsa':
                            return '👜';
                        case 'cripto':
                            return '⚡';
                        case 'tarjeta':
                            return '💳';
                        case 'contado':
                            return '💸';
                        default:
                            return '💰';
                    }
                };

                dolarData.forEach(item => {
                    const emoji = getEmojiForCurrency(item.nombre);
                    const compraFormatted = `$${parseFloat(item.compra).toFixed(1)}`;
                    const ventaFormatted = `$${parseFloat(item.venta).toFixed(1)}`;

                    const lastUpdateDate = new Date(item.fechaActualizacion);
                    const now = new Date();
                    const timeDiff = Math.abs(now - lastUpdateDate);
                    const minutesPassed = Math.floor(timeDiff / (1000 * 60));

                    table.push([
                        chalk.default.cyan(`${emoji} ${item.nombre}`),
                        chalk.default.green(compraFormatted),
                        chalk.default.red(ventaFormatted),
                        chalk.default.white(item.fechaActualizacion),
                        chalk.default.magenta(`${minutesPassed} min`)
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

                if (argv.cotizaciones) {
                    fetchCotizaciones();
                }
            });

        }).on("error", (err) => {
            console.error(chalk.default.red('Error al obtener las cotizaciones del dólar: ' + err.message));
        });
    };

    const fetchCotizaciones = () => {
        https.get('https://dolarapi.com/v1/cotizaciones', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const cotizaciones = JSON.parse(data);
                const table = new Table({
                    head: [
                        chalk.default.yellow('Moneda'),
                        chalk.default.yellow('Compra'),
                        chalk.default.yellow('Venta'),
                        chalk.default.yellow('Última Actualización'),
                        chalk.default.yellow('Últ. Act. Hace')
                    ],
                    colWidths: [20, 15, 15, 35, 20],
                    style: {
                        head: [],
                        border: [''],
                        'padding-left': 2,
                        'padding-right': 1,
                        compact: true,
                        align: ['left', 'right', 'right', 'left', 'left']
                    }
                });

                const getFlagEmojiForCurrency = (currencyCode) => {
                    switch (currencyCode.toUpperCase()) {
                        case 'USD':
                            return '🇺🇸';
                        case 'EUR':
                            return '🇪🇺';
                        case 'BRL':
                            return '🇧🇷';
                        case 'CLP':
                            return '🇨🇱';
                        case 'UYU':
                            return '🇺🇾';
                        default:
                            return '🏳️';
                    }
                };

                cotizaciones.forEach(cot => {
                    const flagEmoji = getFlagEmojiForCurrency(cot.moneda);
                    const compraFormatted = `$${parseFloat(cot.compra).toFixed(1)}`;
                    const ventaFormatted = `$${parseFloat(cot.venta).toFixed(1)}`;

                    const lastUpdateDate = new Date(cot.fechaActualizacion);
                    const now = new Date();
                    const timeDiff = Math.abs(now - lastUpdateDate);
                    const minutesPassed = Math.floor(timeDiff / (1000 * 60));

                    table.push([
                        chalk.default.cyan(`${flagEmoji} ${cot.nombre}`),
                        chalk.default.green(compraFormatted),
                        chalk.default.red(ventaFormatted),
                        chalk.default.white(lastUpdateDate.toLocaleString()),
                        chalk.default.magenta(`${minutesPassed} min`)
                    ]);
                });

                console.log(table.toString());
            });
        }).on("error", (err) => {
            console.error(chalk.default.red('Error al obtener las cotizaciones adicionales: ' + err.message));
        });
    };

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
        setInterval(fetchDolarCotizaciones, 60000);
        setInterval(() => {
            if (!bar.complete) {
                bar.tick();
            }
        }, 1000);
    }

    fetchDolarCotizaciones();
});