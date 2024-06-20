const { Schema, model } = require('mongoose');

const ContratoSchema = Schema({

    programa: {
        type: String,
        required: true
    },
    numeroContrato: {
        type: String,
        required: true
    },
    nombreProveedor: {
        type: String,
        required: true
    },
    tipoContrato: {
        type: String,
        required: true
    },
    Modificaciones: {
        type: String,
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaTerminacion: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

ContratoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Contrato', ContratoSchema);