const Usuarios = require('../models/Usuario');
const jwt = require('jsonwebtoken');
// Agrega un nuevo usuario
exports.nuevoUsuario = async (req, res, next) => {

    console.log(req.body);
    const usuario = new Usuarios(req.body);

    try {
        // almacenar el registro
        await usuario.save();
        res.json({mensaje: 'Se registró correctamente el usuario'});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error al registrar el usuario'});
        next();
    }
    
}

// Mostrar todos los usuarios
exports.mostrarUsuarios = async (req, res, next) => {

    try {
        const usuarios = await Usuarios.find({});
        res.json(usuarios);
    } catch (error) {
        console.log(error);
    }
}

// Mostrar información de un usuario

exports.mostrarUsuario = async (req, res, next) => {

    const usuario = await Usuarios.findById(req.params.idUsuario);

    if (!usuario) {
        res.json({mensaje: 'El usuario no existe'});
        next();
    }

    // Mostrar el usuario
    res.json(usuario);

}

// Actualizar un usuario

exports.actualizarUsuario = async (req, res, next) => {
    try {
        const usuario = await Usuarios.findByIdAndUpdate({_id : req.params.idUsuario}, 
        req.body, {
            new : true
        });
        res.json(usuario);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.autenticarUsuario = async (req, res, next) => {
    // Buscar el usuario   
    const {dni, digito_verificador, fecha_ingreso} = req.body;
    //console.log(fecha_ingreso);
    const usuario = await Usuarios.findOne({dni, digito_verificador, fecha_ingreso});
    //const usuario = await Usuarios.findOne({dni, digito_verificador});

    if (!usuario) {
        // Si el usuario no existe
        await res.status(401).json({mensaje: 'El usuario no existe'});
    } else {
        // El usuario existe
        // verificar si ha realizado su voto

        // Usuario realizo votación
        if (usuario.estado_votacion === 1) {
            await res.status(401).json({mensaje: 'Estimado usuario ya realizó su voto, gracias.'});
        } else {
            const token = jwt.sign({
                id: usuario._id,
                dni: dni,
                digito_verificador: digito_verificador
                //fecha_ingreso: fecha_ingreso
            },
            'LLAVESECRETA',
            {
                expiresIn : '10m'
            });

            res.json({token: token, idUsuario: usuario._id, usuario: usuario.nombres + " " + usuario.apellidos});
        }
    }
}