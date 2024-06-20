/* Rutas de Usuarios - Auth =  host + /api/auth */
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { createUser, login, revalidarToken } = require('../controllers/auth');

router.post(
    '/newUser',
    // middlewares 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 6 carácteres').isLength({ min: 6 }),
        validarCampos
    ], 
    createUser);

router.post(
    '/',  // middlewares 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 6 carácteres').isLength({ min: 6 }),
        validarCampos
    ],
    login);

router.get('/reNewToken', validarJWT, revalidarToken);

module.exports = router;