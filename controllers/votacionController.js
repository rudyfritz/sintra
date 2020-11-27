const Votaciones = require('../models/Votacion');
const Usuarios = require('../models/Usuario');
// Registrar votación
exports.nuevaVotacion = async (req, res, next) => {
    const votacion = new Votaciones(req.body);

    try {
        // almacenar registro
        await votacion.save();
        // actulizar estado de votación de usuario
        const updateUsuario = {estado_votacion : 1};
        const usuario = await Usuarios.findByIdAndUpdate({_id : req.body.usuario}, 
            updateUsuario, {
                new : false
            });
            res.json({mensaje: 'Se registró satisfactoriamente su voto'});


       // res.json({mensaje: 'Se registró satisfactoriamente su voto'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todas las votaciones
exports.mostrarVotaciones = async (req, res, next) => {

    try {
        const votaciones = await Votaciones.find({}).populate('lista').populate('usuario');
        res.json(votaciones)
    } catch (error) {
        console.log(error);
    }
}