const { response } = require('express');
const Contrato = require('../Models/Contrato');

// Controlador para obtener todos los contratos
const getContracts = async(req, res = response) => {
    
    const contratos = await Contrato.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        contratos
    })
}

// Controlador para crear contratos
const createContract = async(req, res = response) => {

    const contrato = new Contrato( req.body );

    try {

        contrato.user = req.uid;
        const contratoGuardado = await contrato.save();

        res.status(201).json({
            ok: true,
            contrato: contratoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

// Controlador para actualizar contratos
const updateContract = async(req, res = response) => {

    const contratoId = req.params.id;
    const uid = req.uid;

    try {

        const contrato = await Contrato.findById( contratoId );
        if ( !contrato ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe contrato con ese id'
            })
        }

        if ( contrato.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoContrato = {
            ...req.body,
            user: uid
        }

        const contratoActualizado = await Contrato.findByIdAndUpdate( contratoId, nuevoContrato, { new: true } );

        res.status(200).json({
            ok: true,
            contrato: contratoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

// Controlador para eliminar contratos
const deleteContract = async(req, res = response) => {

    const contratoId = req.params.id;
    const uid = req.uid;

    try {

        const contrato = await Contrato.findById( contratoId );
        if ( !contrato ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe contrato con ese id'
            })
        }

        if ( contrato.user.toString() !== uid ) {
           return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        await Contrato.findByIdAndDelete( contratoId );

        res.status(200).json({
            ok: true,
            msg: 'Contrato eliminado correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}


module.exports = {
    getContracts,
    createContract,
    updateContract,
    deleteContract
}