# 🌳 Arbolito

![NPM version](https://img.shields.io/npm/v/arbolito)
![License](https://img.shields.io/npm/l/arbolito)

**🌳 Arbolito** es una herramienta de línea de comandos (CLI) diseñada para proporcionar actualizaciones en tiempo real de los valores de las principales monedas en Argentina. Esta aplicación es ideal para economistas, inversores, y cualquier persona interesada en el mercado cambiario argentino.

![Arbolito](https://i.postimg.cc/CxbWRVWX/Screenshot-2024-12-03-at-5-57-52-PM.png)

## Características

- **Actualización en Tiempo Real**: Arbolito actualiza los valores de las monedas cada minuto, mostrando los últimos datos disponibles.
- **Soporte para Múltiples Monedas**: La herramienta incluye información sobre el Dólar Oficial, Dólar Blue, Euro, y otras monedas importantes.
- **Riesgo País en Vivo**: Muestra el valor actualizado del riesgo país argentino en tiempo real.
- **Interfaz Amigable**: Los datos se presentan en una tabla clara y colorida en la consola, facilitando la lectura y el seguimiento de las fluctuaciones monetarias.
- **Tiempo Transcurrido desde la Última Actualización**: Se muestra cuánto tiempo ha pasado desde la última actualización de los datos.

## Cómo Funciona

Arbolito utiliza una serie de llamadas a APIs públicas para obtener los valores actuales de las monedas y luego los muestra en la consola del usuario. La aplicación se actualiza automáticamente cada minuto para reflejar los cambios en los valores de las monedas en tiempo real.

## Instalación

Para instalar Arbolito, tienes dos opciones:

### Como herramienta global de CLI

```bash
npm install -g arbolito
```

### Como dependencia en tu proyecto

```bash
npm install arbolito
```

## Uso

### Como CLI

Una vez instalado globalmente, puedes iniciar Arbolito ejecutando:

```bash
arbolito
```

Para ver los datos en tiempo real con actualizaciones cada 60 segundos:

```bash
arbolito -w
arbolito --watch
```

### Como dependencia

Puedes importar y usar las funciones de Arbolito en tu proyecto:

```javascript
const { getDolares, getCotizaciones, getRiesgoPais } = require("arbolito");

// Obtener cotizaciones de diferentes tipos de dólar
const dolares = await getDolares();
console.log(dolares.blue); // { nombre: 'Dólar Blue', compra: 1000, venta: 1005, fechaActualizacion: '2024-01-01T12:00:00.000Z' }

// Obtener cotizaciones de otras monedas
const cotizaciones = await getCotizaciones();
console.log(cotizaciones.EUR); // { nombre: 'Euro', compra: 1100, venta: 1150, fechaActualizacion: '2024-01-01T12:00:00.000Z' }

// Obtener el riesgo país
const riesgoPais = await getRiesgoPais();
console.log(riesgoPais); // { valor: 2000, fechaActualizacion: '2024-01-01T12:00:00.000Z' }
```

Todas las funciones retornan una promesa y manejan sus propios errores. Los tipos de datos están documentados usando JSDoc.

## Contribuciones

Las contribuciones a Arbolito son bienvenidas. Si deseas contribuir al proyecto, puedes seguir estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/pablolizardo/arbolito.git
   ```
2. Crea una nueva rama para tu característica o corrección:
   ```bash
   git checkout -b nombre-de-tu-rama
   ```
3. Haz tus cambios y haz commit de ellos:
   ```bash
   git commit -am "Añade alguna característica"
   ```
4. Sube la rama a GitHub:
   ```bash
   git push origin nombre-de-tu-rama
   ```
5. Envía un pull request a través de GitHub.

## Licencia

Este proyecto está licenciado bajo la Licencia ISC. Para más detalles, consulta el archivo `LICENSE` en este repositorio.
