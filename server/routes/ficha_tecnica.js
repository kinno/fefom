const express = require("express");
const Router = express.Router();
const connection = require("../db/db");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
app = express();
var baseURL = '';
if ((process.env.NODE_ENV || '').trim() === "production") {
  console.log("Prod")
  baseURL = './dist';
} else {
  console.log("Dev")
  baseURL = './public';
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, baseURL + '/uploads/imgfichas/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })
Router.post("/upload", upload.single("file"), async (req, res) => {
  // upload.single("file"),
  res.status(200).send(req.file.filename);
});

Router.post("/delete", (req, res) => {
  console.log(req.body.imagen)
  fs.unlink(baseURL + '/uploads/imgfichas/' + req.body.imagen, err => {
    if (err) throw err;
    // if no error, file has been deleted successfully
    // console.log('File deleted!');
    res.status(200).send('File deleted');
  });
});

Router.post("/buscar_ficha", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_ficha_tecnica
            WHERE id_ficha_tecnica = ? and id_ayuntamiento = ?
           `;
  connection.query(
  query,
  [data.id_ficha_tecnica,data.id_ayuntamiento],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/buscar_anexo_uno", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_uno
            WHERE id_anexo_uno = ?
           `;
  connection.query(
  query,
  [data.id_anexo_uno],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/buscar_anexo_dos", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_dos
            WHERE id_anexo_dos = ?
           `;
  connection.query(
  query,
  [data.id_anexo_dos],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_anexo_uno", (req, res) => {
  var data = req.body;

  var query = "";
  if (data.id_anexo_uno == null) {
    query = `insert into tbl_anexo_uno
         (estatus,id_cartera_proyecto, id_tipo_ppi, subclasificacion_ppi, monto_con_iva, monto_sin_iva, monto_estudios, fuentes_financiamiento, fecha_inicio_ejecucion, meses_ejecucion, anios_ejecucion, calendario_inversion, localizacion_geografica, ruta_imagen_localizacion)
         values
         (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  } else {
    query = `
         UPDATE tbl_anexo_uno SET
            id_cartera_proyecto = ?,
            id_tipo_ppi=?,
            subclasificacion_ppi=?,
            monto_con_iva=?,
            monto_sin_iva=?,
            monto_estudios=?,
            fuentes_financiamiento=?,
            fecha_inicio_ejecucion=?,
            meses_ejecucion=?,
            anios_ejecucion=?,
            calendario_inversion=?,
            localizacion_geografica=?,
            ruta_imagen_localizacion=?
          WHERE 
            id_anexo_uno=?;
           `;
  }

  connection.query(query, [data.id_cartera_proyecto,data.id_tipo_ppi, data.subclasificacion_ppi, data.monto_con_iva, data.monto_sin_iva, data.monto_estudios, data.fuentes_financiamiento, data.fecha_inicio_ejecucion, data.meses_ejecucion, data.anios_ejecucion, data.calendario_inversion, data.localizacion_geografica, data.ruta_imagen_localizacion, data.id_anexo_uno], (err, rows, fields) => {
    if (err) return res.status(500).send(err)
    if (data.id_ficha_tecnica == null) {
     
      query = `insert into tbl_ficha_tecnica
          (ejercicio, id_ayuntamiento, estatus, fecha_ficha, fecha_creacion, version, id_anexo_uno)
          values
          (?, ?, 1, NOW(), NOW(), 'v1', ?)`;

      connection.query(query, [data.ejercicio, data.id_ayuntamiento, rows.insertId], (err, result, fields) => {
        if (err) return res.status(500).send(err)
        res.status(200).send({id_ficha_tecnica: result.insertId, id_anexo_uno: rows.insertId})
      })
    }else{
      (data.id_anexo_uno == null) ? res.status(200).send({id_anexo_uno: rows.insertId}) : res.status(200).send({id_anexo_uno: data.id_anexo_uno})
      
    }
  })
});

Router.post("/guardar_anexo_dos", (req, res) => {
  var data = req.body;
  var query = "";
  if (data.id_anexo_dos == null) {
    query = `insert into tbl_anexo_dos
         (estatus,alineacion_estrategica, proyecto_complementario, relacion_complementaria)
         values
         (1, ?, ?, ?)`
  } else {
    query = `
         UPDATE tbl_anexo_dos SET
          estatus=1,
          alineacion_estrategica=?,
          proyecto_complementario=?,
          relacion_complementaria=?
          WHERE 
            id_anexo_dos=?
           `;
  }

  connection.query(query, [data.alineacion_estrategica, data.proyecto_complementario, data.relacion_complementaria, data.id_anexo_dos], (err, rows, fields) => {
    if (err) return res.status(500).send(err)
    if(data.id_anexo_dos == null){
     
        query2 = `
         UPDATE tbl_ficha_tecnica SET
          id_anexo_dos=?
          WHERE 
            id_ficha_tecnica=?
           `;
           connection.query(query2, [rows.insertId,data.id_ficha_tecnica], (err2, rows2, fields) => {
            if (err2) return res.status(500).send(err2)
            res.status(200).send({id_anexo_dos: rows.insertId})
          })
      
    }else{
      
      res.status(200).send({id_anexo_dos: data.id_anexo_dos})
    }
  })
});

module.exports = Router;
