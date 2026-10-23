import 'dotenv/config';
import app from './app.js';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET es obligatorio. Configuralo en el archivo .env.');
}

const port = Number(process.env.PORT ?? 3000);
const server = app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on('error', (error) => {
    console.error('No se pudo iniciar el servidor:', error);
    process.exitCode = 1;
});