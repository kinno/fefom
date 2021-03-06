const express = require("express");
const Router = express.Router();
const connection = require("../db/db");
var pdf = require('html-pdf')
var moment = require('moment');
const path = require('path');

var formatoOficio = require('../formatoOficios');
moment.locale("Es");


Router.post("/buscar_oficio_techos", (req, res) => {
  query = `
          SELECT tbl_principal_oficio.*, cat_ejercicio.leyenda FROM tbl_principal_oficio
            left join cat_ejercicio on tbl_principal_oficio.ejercicio = cat_ejercicio.ejercicio
          WHERE tbl_principal_oficio.ejercicio like ? and tbl_principal_oficio.id_municipio = ? and id_tipo_oficio = 1
           `;
  connection.query(
    query,
    [req.body.ejercicio, req.body.municipio],
    (err, rows, fields) => {
      //   console.log(rows.length);
      if (err) return res.status(500).send("Error del servidor." + err);
      if (rows.length == 0) return res.status(201).send("No hay datos");
      res.status(200).json({
        datos:rows
      });
    }
  );
});

Router.post("/crear_oficio", async (req, res) => {
  var data = req.body;
  var titulo = data.municipio.titulo + "\n" + data.municipio.nombre + "\n" + data.municipio.cargo + "\nPRESENTE"
  var texto;
  //   console.log(data);

  query = `
    SELECT * FROM cat_texto_oficios
    WHERE ejercicio like ? and id_tipo_oficio = ?
   `;
  connection.query(
    query,
    [data.ejercicio, data.tipo_oficio],
    (err, rows, fields) => {
      //   console.log(rows.length);
      if (err) return res.status(500).send("Error del servidor." + err);
      if (rows.length == 0) return res.status(201).send("No hay datos");
      texto = rows[0];
      //   console.log(texto)
      var queryUltimoFolio = `
      SELECT 
          MAX(folio) + 1 as folio
      FROM
          tbl_principal_oficio
      WHERE
          ejercicio = ?;
      ` 
      connection.query(
        queryUltimoFolio,
        [data.ejercicio],
        function (err, rows, fields){
          if (err) return res.status(500).send("Error del servidor." + err);
          var folio;
          (rows[0].folio !== null) ? folio = rows[0].folio : folio = 1
          // console.log(folio)
          // return res.status(500).send("Error del servidor." + err);
          var claveOficio = `20704000l/FEFOM-${folio}/${data.ejercicio}`
          var query = `
            insert into tbl_principal_oficio
            (id_tipo_oficio, ejercicio, id_municipio, clave_oficio,folio, estatus, fecha_oficio, fecha_creacion, titulo, texto, id_techo_financiero)
            values
            (?,?,?,?,?,1,NOW(),NOW(),?,?,?)
        `;
          connection.query(
            query,
            [data.tipo_oficio, data.ejercicio, data.municipio.id_municipio,claveOficio,folio,titulo, texto.texto, data.id_techo],
            (err, result) => {
              if (err) return res.status(500).send("Error del servidor." + err);
              switch (data.tipo_oficio) {
                case 2:
                  var proyectos = [];
                  data.cartera.forEach(element => {
                    proyectos.push([result.insertId, element.id_cartera_proyecto]);
                  });
                  var sql = "INSERT INTO tbl_detalle_oficio (id_principal_oficio, id_cartera_proyecto) VALUES ?";
                  connection.query(sql, [proyectos], function (err, result) {
                    if (err) return res.status(500).send("Error del servidor." + err);
                  });
                  break;

                default:
                  break;
              }
              res.status(200).send("Ok");
            }
          );
        });
    }
  );
});

Router.post("/buscar_oficio_cartera", (req, res) => {
  var datos = [];
      query = `
            SELECT tbl_principal_oficio.*, cat_ejercicios.leyenda FROM tbl_principal_oficio
            WHERE ejercicio like ? and id_municipio = ? and id_tipo_oficio = 2
           `;
      connection.query(
        query,
        [req.body.ejercicio, req.body.municipio],
        (err, rows, fields) => {
          //   console.log(rows.length);
          if (err) return res.status(500).send("Error del servidor." + err);
          if (rows.length == 0) return res.status(201).send("No hay datos");
          datos.push(rows[0])
          query2 = `
            SELECT tbl_cartera_proyectos.nombre_proyecto, tbl_cartera_proyectos.monto FROM tbl_detalle_oficio
            join tbl_cartera_proyectos on tbl_detalle_oficio.id_cartera_proyecto = tbl_cartera_proyectos.id_cartera_proyecto
            where tbl_detalle_oficio.id_principal_oficio = ?
           `;
          connection.query(
            query2,
            [rows[0].id_principal_oficio],
              (err, rows2, fields) => {
                if (err) return res.status(500).send("Error del servidor." + err);
                
                // console.log(rows2)
                datos.push(rows2)
                res.status(200).json({
                  datos
                });
              }
            ); 
          }
        );
      });

    Router.post("/actualizar_oficio", async (req, res) => {
      var oficio = req.body.oficio;

      //   console.log(oficio);
      var query = `
  UPDATE tbl_principal_oficio SET
        clave_oficio=?, 
        fecha_oficio=?, 
        titulo=?, 
        texto=?, 
        copias=?, 
        iniciales=?, 
        tat=? 
    WHERE 
        id_principal_oficio=?;
    `;
      connection.query(
        query,
        [oficio.clave_oficio, new Date(oficio.fecha_oficio), oficio.titulo, oficio.texto, oficio.copias, oficio.iniciales, oficio.tat, oficio.id_principal_oficio],
        (err, rows, fields) => {
          if (err) return res.status(500).send("Error del servidor." + err);
          if (rows.length < 1) return res.status(404).send("Datos Incorrentos.");
          res.status(200).send("Ok");
        }
      );

    });


    Router.get("/imprimir_oficio", (req, res) => {
      // console.log(req.query)
      var ruta = path.join(__dirname,'../../public/img/headerM.jpg');
       ruta = ruta.replace(/\\/g, "/");
      var html = formatoOficio(req.query);
      var config = {

        "format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "border": {
          "top": "0cm",            // default is 0, units: mm, cm, in, px
          "right": "1.4cm",
          "bottom": "1.2cm",
          "left": "1.4cm"
        },

        paginationOffset: 1, // Override the initial pagination number
        "header": {
          "height": "28mm",
        },
        // "footer": {
        //   "height": "28mm",
        // },
        // "footer": {
        //   "height": "28mm",
        //   "contents": {
        //     first: 'Cover page',
        //     2: 'Second page', // Any page number is working. 1-based index
        //     default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        //     last: 'Last Page'
        //   }
        // },
      }
      pdf.create(html, config).toStream(function (err, stream) {
        res.setHeader('Content-disposition', 'attachment; filename=oficio.pdf');
        res.setHeader('Content-type', 'application/pdf');
        stream.pipe(res);
      });

    });

    module.exports = Router;
