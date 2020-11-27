const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombres: String,
    apellidos: String,
    dni: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    digito_verificador: {
        type: Number,
        required: true,
        trim: true
    },
    fecha_ingreso: {
        type: Date,
        required: true,
        trim: true
    },
    estado_votacion: {
        type: Number,
        default: 0
    },
    tipo_usuario: {
        type: Number,
        default: 0
    },
    fecha_creacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);