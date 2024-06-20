const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../Models/Usuario');
const { generarJWT } = require('../helpers/jwt');

// Controlador para crear un nuevo usuario
const createUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        }
    
        usuario = new Usuario( req.body );
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        // Guardar el usuario en DB
        await usuario.save();

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token        
        })    

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });        
    }
}

// Controlador para realizar el logueo
const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        // Validar email
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese correo'
            });
        }      
    
        // Validar contraseñas
        const passwordValidated = bcrypt.compareSync( password, usuario.password );
        if ( !passwordValidated ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name);
        
        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });        
    }
}

// Controlador para revalidar e Token
const revalidarToken = async(req, res = response) => {
    
    const uid = req.uid;
    const name = req.name;

    // Generar un nuevo Token
    const token = await generarJWT(uid, name);
    
    res.json({
        ok: true,
        uid,
        name,
        token
    })    
}

module.exports = {
    createUser,
    login,
    revalidarToken
}