const express = require('express');
const router = express.Router();
// importar controladores
const usuarioController = require('../controllers/usuarioController');
const listaController = require('../controllers/listaController');
const votacionController = require('../controllers/votacionController');

// middleware para proteger las rutas
const auth =  require('../middleware/auth');

module.exports = function() {

    /** USUARIOS */

    // Agregar nuevos usuarios
    router.post('/usuarios', usuarioController.nuevoUsuario);

    // Listar todos los usuarios
    router.get('/usuarios', usuarioController.mostrarUsuarios);

    // Mostrar un usuario especifico
    router.get('/usuarios/:idUsuario', usuarioController.mostrarUsuario);

    // Editar un usuario especifico
    router.put('/usuarios/:idUsuario', usuarioController.actualizarUsuario);

    // Iniciar Sesion
    router.post('/iniciar-sesion', usuarioController.autenticarUsuario);

    /** LISTAS */
    
    // Registrar nueva lista
    router.post('/listas/nueva', listaController.nuevaLista);

    // Mostrar todas las listas
    router.get('/listas', 
    auth,
    listaController.mostrarListas);

    // Mostrar una lista especifica
    router.get('/listas/:idLista', listaController.mostrarLista);

    // Editar una lista especifica
    router.put('/listas/editar/:idLista', listaController.actualizarLista);


    /**VOTACIONES */

    // Registrar nuevo voto
    router.post('/votaciones', votacionController.nuevaVotacion);

    // Mostrar todas las votaciones
    router.get('/votaciones', votacionController.mostrarVotaciones);




    return router;
}
