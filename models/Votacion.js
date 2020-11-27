const mongoose = require('mongoose');
//import { Schema as _Schema, model } from 'mongoose';
const Schema = mongoose.Schema;

const votacionSchema = new Schema({
    lista: {
        type: Schema.ObjectId,
        ref: 'Listas'
    },
    usuario: {
        type: Schema.ObjectId,
        ref: 'Usuarios'
    },
    fecha_votacion: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Votacion', votacionSchema);