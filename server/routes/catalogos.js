const express = require('express');
const Router = express.Router();
const connection = require("../db/db");
const bcrypt = require("bcrypt")

Router.get('/get_usuarios', (req, res) => {
  const query = "Select usuario.*, municipio.descripcion from cat_usuario as usuario left join cat_municipio as municipio on usuario.id_municipio = municipio.id_municipio";
  connection.query(query, (err, rows, fields) => {
    if (err) return res.status(500).send('Error del servidor.' + err);
    if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
    res.status(200).json({
      rows
    });
  })
})

Router.get("/get_municipios", (req, res) => {
  connection.query("Select * from cat_municipio join cat_cargo on cat_municipio.id_cargo = cat_cargo.id_cargo", (err, rows, fields) => {
    if (err) return res.status(500).send('Error del servidor.' + err);
    if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
    res.status(200).json({
      rows
    });
  })
})

Router.get("/get_ejercicios", (req, res) => {
  connection.query("Select * from cat_ejercicio", (err, rows, fields) => {
    if (err) return res.status(500).send('Error del servidor.' + err);
    if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
    res.status(200).json({
      rows
    });
  })
})

Router.get("/get_rubros", (req, res) => {
  connection.query("Select * from cat_rubro_inversion", (err, rows, fields) => {
    if (err) return res.status(500).send('Error del servidor.' + err);
    if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
    res.status(200).json({
      rows
    });
  })
})

Router.get("/get_cargos", (req, res) => {
  connection.query("Select * from cat_cargo", (err, rows, fields) => {
    if (err) return res.status(500).send('Error del servidor.' + err);
    if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
    res.status(200).json({
      rows
    });
  })
})

Router.get("/get_tipo_ppi", (req, res) => {
  connection.query("Select * from cat_tipo_ppi", (err, rows, fields) => {
    if (err) return res.status(500).send('Error del servidor.' + err);
    if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
    res.status(200).json({
      rows
    });
  })
})

Router.get("/get_catalogo_observaciones", (req, res) => {
  connection.query("Select * from cat_observaciones", (err, rows, fields) => {
    if (err) return res.status(500).send('Error del servidor.' + err);
    if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
    res.status(200).json({
      rows
    });
  })
})

Router.post('/registrar_usuario', function(req, res) {
    console.log(req.body)
    var user = req.body
    var query= "";
    if(user.id == null){
         query = "insert into cat_usuario(username, password, id_municipio, activo, tipo_usuario, tipo_rol, nombre, apellido_paterno, apellido_materno) values (?,?,?,?,?,?,?,?,?)"
    }else{
         query = "update cat_usuario set username=?, password=?, id_municipio=?, activo=?, tipo_usuario=?, tipo_rol=?, nombre=?, apellido_paterno=?, apellido_materno=? where id_usuario=?"
    }
    connection.query(query,[user.username,bcrypt.hashSync(user.password, 8),user.id_municipio, user.activo, user.tipo_usuario, user.tipo_rol,user.nombre, user.apellido_paterno, user.apellido_materno, user.id],(err, rows, fields)=>{
        if (err) return res.status(500).send(err)
        res.status(200).send("ok")
    })    
});

Router.post('/registrar_ayuntamiento', function(req, res) {
    console.log(req.body)
    var municipio = req.body
    var query= "";
    if(municipio.id_municipio == null){
         query = "insert into cat_municipio(descripcion, id_cargo, título, nombre) values (?,?,?,?)"
    }else{
         query = "update cat_municipio set descripcion=?, id_cargo=?, título=?, nombre=? where id_municipio=?"
    }
    connection.query(query,[municipio.descripcion,municipio.id_cargo,municipio.titulo,municipio.nombre,municipio.id_municipio],(err, rows, fields)=>{
        if (err) return res.status(500).send(err)
        res.status(200).send("ok")
    })    
});

Router.post('/registrar_ejercicio', function(req, res) {
    console.log(req.body)
    var ejercicio = req.body
    var query= "";
    if(ejercicio.id_ejercicio == null){
         query = "insert into cat_ejercicio(ejercicio, leyenda) values (?,?)"
    }else{
         query = "update cat_ejercicio set ejercicio=?, leyenda=? where id_ejercicio=?"
    }
    connection.query(query,[ejercicio.ejercicio,ejercicio.leyenda,ejercicio.id_ejercicio],(err, rows, fields)=>{
        if (err) return res.status(500).send(err)
        res.status(200).send("ok")
    })    
});

Router.post('/eliminar_usuario', function(req, res) {
   
    var user = req.body
    var query= "";
    query = "update cat_usuario set activo = 0 where id_usuario = ?"
    // console.log(user.id)
    connection.query(query,[user.id],(err, rows, fields)=>{
        if (err) return res.status(500).send(err)
        return res.status(200).send("ok")
    })    
});

Router.post('/eliminar_ejercicio', function(req, res) {
   
    var ejercicio = req.body
    var query= "";
    query = "delete from cat_ejercicio where id_ejercicio = ?"
    // console.log(user.id)
    connection.query(query,[ejercicio.id_ejercicio],(err, rows, fields)=>{
        if (err) return res.status(500).send(err)
        return res.status(200).send("ok")
    })    
});
module.exports = Router;
