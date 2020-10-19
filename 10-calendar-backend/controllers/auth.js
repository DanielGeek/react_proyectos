const { response } = require('express');

const crearUsuario = (req, res = response ) => {

    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
}

const loginusuario = (req, res = response ) => {

    const { email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
};

const revalidarToken = (req, res = response ) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
};

module.exports = {
    crearUsuario,
    loginusuario,
    revalidarToken
}