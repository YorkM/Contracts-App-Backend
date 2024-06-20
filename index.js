// Requerir express
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Creando servidor de express
const app = express();

// Conexión a la DB
dbConnection();

// Configurar CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Middleware para obtemer la información de post
app.use(express.json());

// Rutas
// Auth - Contracts
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contracts', require('./routes/contracts'));

// Escuchar las peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando el puerto ${ process.env.PORT }`);
});