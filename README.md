# 🌳 Arbolito

![NPM version](https://img.shields.io/npm/v/arbolito)
![License](https://img.shields.io/npm/l/arbolito)

**🌳 Arbolito** es una herramienta de línea de comandos (CLI) diseñada para proporcionar actualizaciones en tiempo real de los valores de las principales monedas en Argentina. Esta aplicación es ideal para economistas, inversores, y cualquier persona interesada en el mercado cambiario argentino.

![Arbolito](https://i.postimg.cc/ncJrxJ6C/Screenshot-2024-12-03-at-12-48-36-PM.png)

## Características

- **Actualización en Tiempo Real**: Arbolito actualiza los valores de las monedas cada minuto, mostrando los últimos datos disponibles.
- **Soporte para Múltiples Monedas**: La herramienta incluye información sobre el Dólar Oficial, Dólar Blue, Euro, y otras monedas importantes.
- **Interfaz Amigable**: Los datos se presentan en una tabla clara y colorida en la consola, facilitando la lectura y el seguimiento de las fluctuaciones monetarias.

## Cómo Funciona

Arbolito utiliza una serie de llamadas a APIs públicas para obtener los valores actuales de las monedas y luego los muestra en la consola del usuario. La aplicación se actualiza automáticamente cada minuto para reflejar los cambios en los valores de las monedas en tiempo real.

## Instalación

Para instalar Arbolito globalmente, necesitarás tener Node.js y npm instalados en tu máquina. Una vez instalados, puedes ejecutar el siguiente comando en tu terminal:

```bash
npm install -g arbolito
```

Este comando instalará Arbolito globalmente en tu sistema, permitiéndote ejecutarlo desde cualquier lugar en tu terminal.

## Uso

Una vez instalado, puedes iniciar Arbolito simplemente ejecutando el siguiente comando en tu terminal:

```bash
arbolito
```

Una vez iniciado, verás la tabla de valores de monedas actualizarse automáticamente cada minuto.

## Contribuciones

Las contribuciones a Arbolito son bienvenidas. Si deseas contribuir al proyecto, puedes seguir estos pasos:

1. Clona el repositorio:
   ```bash
   git clone URL_DEL_REPOSITORIO
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
