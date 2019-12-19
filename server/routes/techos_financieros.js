const express = require("express");
const Router = express.Router();
const connection = require("../db/db");
const bcrypt = require("bcrypt");
const multer = require("multer");
var fs = require("fs");
var xlsx = require("node-xlsx");

const upload = multer({
  dest: "./uploads"
});

Router.post("/get_techos", (req, res) => {
  query = `
         select *,tbl_techos_financieros.id_techo_financiero as id_techo from tbl_techos_financieros 
         join cat_municipio on tbl_techos_financieros.id_municipio = cat_municipio.id_municipio
         where tbl_techos_financieros.ejercicio like ?
         `;
  connection.query(query, [req.body.ejercicio], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).json({
      rows
    });
  });
});

Router.post("/registrar_techo", function(req, res) {
  console.log(req.body);
  var techo = req.body;
  var query = "";
  if (techo.id == null) {
    query = `
         insert into tbl_techos_financieros
         (id_municipio, ejercicio, monto_total, monto_iluminacion_municipal, porc_iluminacion_municipal, monto_seguridad, porc_seguridad, monto_inversion_publica, porc_inversion_publica, monto_desarrollo, porc_desarrollo, monto_no_etiquetado, porc_no_etiquetado)
          values 
          (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  } else {
    query = `
         update tbl_techos_financieros
        set id_municipio=?, ejercicio=?, monto_total=?, monto_iluminacion_municipal=?, porc_iluminacion_municipal=?, monto_seguridad=?, porc_seguridad=?, monto_inversion_publica=?, porc_inversion_publica=?, monto_desarrollo=?, porc_desarrollo=?, monto_no_etiquetado=?, porc_no_etiquetado=? 
        where id_techo_financiero=?`;
  }
  connection.query(
    query,
    [
      techo.id_municipio,
      techo.ejercicio,
      techo.monto_total,
      techo.monto_iluminacion_municipal,
      techo.porc_iluminacion_municipal,
      techo.monto_seguridad,
      techo.porc_seguridad,
      techo.monto_inversion_publica,
      techo.porc_inversion_publica,
      techo.monto_desarrollo,
      techo.porc_desarrollo,
      techo.monto_no_etiquetado,
      techo.porc_no_etiquetado,
      techo.id
    ],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      res.status(200).send("ok");
    }
  );
});

Router.post("/eliminar_techo", (req, res) => {
  query = `
         Delete from tbl_techos_financieros where id_techo_financiero = ?
         `;
  connection.query(query, [req.body.id], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    if (rows.length < 1) return res.status(404).send("Datos Incorrentos.");
    res.status(200).json({
      rows
    });
  });
});

Router.post("/upload", upload.single("file"), async (req, res) => {
  const excel = xlsx.parse(req.file.path);
  for (const index in excel[0].data) {
    var arraySizes = [];
    if (index > 1) {
      if (typeof excel[0].data[index][0] !== "undefined") {
        connection.query(
          "Select * from cat_municipio where descripcion like ?",
          [excel[0].data[index][0].toUpperCase()],
          (err, rows, fields) => {
            if (err) return res.status(500).send("Error del servidor." + err);
            if (rows.length < 1)
              return res.status(404).send("Datos Incorrentos.");
            var id_municipio = rows[0].id;
              var query = `insert into tbl_techos_financieros
              (id_municipio, ejercicio, monto_total, monto_iluminacion_municipal, porc_iluminacion_municipal, monto_seguridad, porc_seguridad, monto_inversion_publica, porc_inversion_publica, monto_desarrollo, porc_desarrollo, monto_no_etiquetado, porc_no_etiquetado)
               values
               (?,?,?,?,?,?,?,?,?,?,?,?,?)`
              connection.query(query ,
                [id_municipio,
                  req.body.ejercicio,
                  excel[0].data[index][1] ,
                  excel[0].data[index][2] ,
                  excel[0].data[index][3] * 100 ,
                  excel[0].data[index][4] ,
                  excel[0].data[index][5] * 100,
                  excel[0].data[index][6] ,
                  excel[0].data[index][7] * 100,
                  excel[0].data[index][8] ,
                  excel[0].data[index][9] * 100,
                  excel[0].data[index][10] ,
                  excel[0].data[index][11] * 100
                ], (err, rows, fields) => {
                  if (err) return res.status(500).send('Error del servidor.' + err);
                  if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
              })
          }
        );
      }
    }
  }
  fs.unlink(req.file.path, err => {
    if (err) throw err;
    // if no error, file has been deleted successfully
    // console.log('File deleted!');
  });
  res.status(200).send();
});

Router.post("/get_techos_ayuntamiento", (req, res) => {
  query = `
         select * from tbl_techos_financieros 
         where ejercicio like ? and id_municipio = ?
         `;
  connection.query(
    query,
    [req.body.ejercicio, req.body.id_municipio],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).json({
        rows
      });
    }
  );
});
module.exports = Router;
