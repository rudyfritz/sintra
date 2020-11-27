const Listas = require('../models/Lista');

// Registrar una lista
exports.nuevaLista = async (req, res, next) => {
    const lista = new Listas(req.body);

    try {
        // Almacenar registro
        await lista.save();
        res.json({mensaje: 'Se registró correctamente la lista'});
        
    } catch (error) {
        console.log(error);
        next();
    }

}

// Mostrar todas las listas
exports.mostrarListas = async (req, res, next) => {

    try {
        const listas = await Listas.find({});
        res.json(listas);
    } catch (error) {
        console.log(error);
    }

}

// Mostrar información de una lista
exports.mostrarLista = async (req, res, next) => {
    const lista = await Listas.findById(req.params.idLista);

    if (!lista) {
        res.json({mensaje: 'La lista no existe'});
        next();
    }

    // Mostrar la Lista
    res.json(lista);
}

// Actualizar una lista
exports.actualizarLista = async (req, res, next) => {

    try {
        const lista = await Listas.findByIdAndUpdate({_id: req.params.idLista}, 
        req.body, {
            new: true
        });
        res.json(lista);
    } catch (error) {
        console.log(error);
        next();
    }

}

