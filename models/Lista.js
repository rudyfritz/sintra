const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: Number,
        default: 0
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lista', listaSchema);