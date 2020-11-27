const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});

// Cors
const cors = require('cors');

// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

// crear una app de express
const app = express();

//Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Definir un dominio(s) para recibir las peticiones
// whiteList para desarrollo
//const whiteList = ['http://localhost:3000'];
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        // Revisar si la peticion viene de un servidor que esta en whitelist
        const existe = whiteList.some( dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

// Habilitar cors
//app.use(cors());
app.use(cors(corsOptions));

// Rutas de la app
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// Iniciar app
// Puerto
//app.listen(5000);
app.listen(port, host, () => {
    console.log('El servidor está funcionando');
})
