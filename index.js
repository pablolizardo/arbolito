#!/usr/bin/env node

const axios = require('axios');
const chalkPromise = import('chalk');
const Table = require('cli-table3');
const ProgressBar = require('progress');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

chalkPromise.then(chalk => {
    const fetchRiesgoPais = async () => {
        try {
            const response = await axios.get('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo');
            const riesgoPaisData = response.data;
            const valor = riesgoPaisData.valor;

            console.clear();
            console.log(chalk.default.yellow(' 🌳 Arbolito'),
                chalk.default.green('\t\t\t\t\t\t\t\t\t 📊 Riesgo País:'),
                chalk.default.red(`${valor} puntos`));
            console.log();
        } catch (error) {
            console.error(chalk.default.red('Error al obtener el riesgo país: ' + error.message));
        }
    };

    const fetchDolarCotizaciones = async () => {
        try {
            const [dolarResponse, cotizacionesResponse] = await Promise.all([
                axios.get('https://dolarapi.com/v1/dolares'),
                axios.get('https://dolarapi.com/v1/cotizaciones')
            ]);

            const dolarData = dolarResponse.data;
            const cotizacionesData = cotizacionesResponse.data;

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
                    compact: true,
                    head: [],
                    border: [''],
                    'padding-left': 2,
                    'padding-right': 1,
                    align: ['left', 'right', 'right', 'left', 'left']
                }
            });

            const getEmojiForCurrency = (currencyName) => {
                switch (currencyName.toLowerCase()) {
                    case 'oficial': return '💵';
                    case 'blue': return '💶';
                    case 'bolsa': return '👜';
                    case 'cripto': return '⚡';
                    case 'tarjeta': return '💳';
                    case 'contado': return '💸';
                    default: return '💰';
                }
            };

            const getFlagEmojiForCurrency = (currencyCode) => {
                switch (currencyCode.toUpperCase()) {
                    case 'USD': return '🇺🇸';
                    case 'EUR': return '🇪🇺';
                    case 'BRL': return '🇧🇷';
                    case 'CLP': return '🇨🇱';
                    case 'UYU': return '🇺🇾';
                    default: return '🏳️';
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

            table.push([
                chalk.default.gray('-'.repeat(15)),
                chalk.default.gray('-'.repeat(10)),
                chalk.default.gray('-'.repeat(10)),
                chalk.default.gray('-'.repeat(30)),
                chalk.default.gray('-'.repeat(15))
            ]);

            cotizacionesData.forEach(cot => {
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
            console.log();
        } catch (error) {
            console.error(chalk.default.red('Error al obtener las cotizaciones: ' + error.message));
        }
    };

    const fetchAllData = async () => {
        await fetchRiesgoPais();
        await fetchDolarCotizaciones();
    };

    const args = process.argv.slice(2);
    const liveUpdate = args.includes('-w') || args.includes('--watch');

    let bar = new ProgressBar('⏱️  :bar', {
        total: 60,
        width: 107,
        complete: '█',
        incomplete: '░',
        clear: true,
        renderThrottle: 100,
    });

    if (liveUpdate) {
        setInterval(fetchAllData, 60000);
        setInterval(() => {
            if (!bar.complete) {
                bar.tick();
            } else {
                bar = new ProgressBar('⏱️  :bar', {
                    total: 60,
                    width: 107,
                    complete: '█',
                    incomplete: '░',
                    clear: true,
                    renderThrottle: 100,
                });
            }
        }, 1000);
    }

    fetchAllData();
});