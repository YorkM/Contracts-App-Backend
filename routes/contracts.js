/* Rutas para Contratos - host + /api/contracts */

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const { getContracts, createContract, updateContract, deleteContract } = require('../controllers/contracts');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Opción de middleware para optimizar un poco el código
// router.use( validarJWT );

// Ruta para obtener todos los contratos
router.get('/', validarJWT, getContracts);

// Ruta para crear contratos
router.post(
    '/', 
    validarJWT,
    [
        check('programa', 'El programa es obligatorio').not().isEmpty(),
        check('numeroContrato', 'El número de contrato es obligatorio').not().isEmpty(),
        check('nombreProveedor', 'El nombre del proveedor es obligatorio').not().isEmpty(),
        check('tipoContrato', 'El tipo de contrato es obligatorio').not().isEmpty(),
        check('fechaInicio', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('fechaTerminacion', 'La fecha de terminación es obligatoria').custom( isDate ),
        validarCampos
    ], 
    createContract
);

// Ruta para actualizar contratos
router.put(
    '/:id', 
    validarJWT,
    [
        check('programa', 'El programa es obligatorio').not().isEmpty(),
        check('numeroContrato', 'El número de contrato es obligatorio').not().isEmpty(),
        check('nombreProveedor', 'El nombre del proveedor es obligatorio').not().isEmpty(),
        check('tipoContrato', 'El tipo de contrato es obligatorio').not().isEmpty(),
        check('fechaInicio', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('fechaTerminacion', 'La fecha de terminación es obligatoria').custom( isDate ),
        validarCampos
    ], 
    updateContract);

// Ruta para eliminar contratos
router.delete('/:id', validarJWT, deleteContract);


module.exports = router;