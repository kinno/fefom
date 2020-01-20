const express = require('express');
const Router = express.Router();
const connection = require("../db/db");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const config = require('../config');

Router.post('/register-admin', function(req, res) {
    db.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        1
    ],
    function (err) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        db.selectByEmail(req.body.email, (err,user) => {
            if (err) return res.status(500).send("There was a problem getting user")
            let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
        }); 
    }); 
});

Router.post('/', (req, res) => {
    const query = "Select * from cat_usuario join cat_municipio on cat_usuario.id_municipio = cat_municipio.id_municipio where cat_usuario.username = ?";
    connection.query(query,[req.body.username],(err, rows, fields)=>{
        if (err) return res.status(500).send('Error del servidor.'+err);
        if (rows.length < 1) return res.status(404).send('Usuario y/o contraseña incorrectos.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, rows[0].password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: rows[0].id }, config.secret, { expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({ auth: true, token: token, user: rows[0] });
    })
})

Router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null, user: null });
})
module.exports = Router;