const express = require("express");
const Router = express.Router();
const connection = require("../db/db");

var pdf = require('html-pdf')
var moment = require('moment');
var formatoCartera = require('../formatoCartera');

Router.post("/agregar_proyecto", (req, res) => {
    // console.log(req.body)
    var proyecto = req.body
    var query= "";
    // if(proyecto.id == null){
         query = `
         insert into tbl_cartera_proyectos
         (ejercicio,id_municipio,nombre_proyecto,monto,descripcion_proyecto,localidad,total_meta,unidad_medida_meta, id_rubro, estatus)
          values 
        (?,?,?,?,?,?,?,?,?,?)`
    // }else{
    //      query = `
    //      update tbl_techos_financieros
    //     set ejercicio=?, id_municipio=?, nombre_proyecto=?, monto=?, id_rubro=?, estatus=? 
    //     where id=?`
    // }
  connection.query(query, [proyecto.ejercicio, proyecto.id_municipio, proyecto.nombre_proyecto, proyecto.monto, proyecto.descripcion_proyecto,proyecto.localidad,proyecto.total_meta,proyecto.unidad_medida_meta, proyecto.id_rubro, proyecto.estatus], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    // console.log(rows.insertId)
    res.status(200).json({
      rows
    });
  });
});

Router.post("/get_cartera", (req, res) => {
    var condition = req.body
    // console.log(condition)
    query = `
           select *, 
           CASE WHEN estatus = 1 THEN "Edición"
            WHEN estatus = 2 THEN "Revisión"
            WHEN estatus = 3 THEN "Aceptado"
            WHEN estatus = 4 THEN "Rechazado"
           ELSE "Error en el estatus"
           END AS desc_estatus
          from tbl_cartera_proyectos 
           where id_municipio = ? and ejercicio like ? ORDER BY id_rubro
           `
    connection.query(query,[condition.id_municipio, condition.ejercicio],(err, rows, fields) => {
      if (err) return res.status(500).send('Error del servidor.' + err);
      var proyectos = {
          iluminacion: [],
          seguridad: [],
          inversion: [],
          desarrollo: [],
          proteccion_civil: [],
          no_etiquetado: [],
      }
      rows.forEach(element => {
          switch (element.id_rubro) {
              case 1:
                  proyectos.iluminacion.push(element)
                  break;
              case 2:
                  proyectos.seguridad.push(element)
                  break;
              case 3:
                  proyectos.inversion.push(element)
                  break;
              case 4:
                  proyectos.desarrollo.push(element)
                  break;
              case 5:
                  proyectos.proteccion_civil.push(element)
                  break;
              case 6:
                  proyectos.no_etiquetado.push(element)
                  break;
          
              default:
                  break;
          }
      });
    //   console.log(proyectos)
      res.status(200).json({
        proyectos
      });
    })
  })

Router.post("/get_cartera_simple", (req, res) => {
    var condition = req.body
    // console.log(condition)
    query = `
           select * 
            from tbl_cartera_proyectos 
           where id_municipio = ? and ejercicio like ?
           and estatus = 3
           `
          //  console.log(query,condition.id_municipio)
    connection.query(query,[condition.id_municipio, condition.ejercicio],(err, rows, fields) => {
      if (err) return res.status(500).send('Error del servidor.' + err);
      res.status(200).json({
        rows
      });
    })
  })

  Router.post("/eliminar_proyecto", (req, res) => {
      console.log(req.body.id)
    query = `
           Delete from tbl_cartera_proyectos where id_cartera_proyecto = ?
           `
    connection.query(query,[req.body.id],(err, rows, fields) => {
      if (err) return res.status(500).send('Error del servidor.' + err);
      if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
      res.status(200).json({
        rows
      });
    })
  })

  Router.post("/cerrar_cartera", (req, res) => {
      console.log(req.body.id)
    query = `
           Update tbl_cartera_proyectos set
           estatus = 2, observaciones = '' where ejercicio = ? and id_municipio = ? and estatus != 3
           `
    connection.query(query,[req.body.ejercicio, req.body.id_municipio],(err, rows, fields) => {
      if (err) return res.status(500).send('Error del servidor.' + err);
      if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
      res.status(200).json({
        rows
      });
    })
  })

  Router.post("/aceptar_proyecto", (req, res) => {
      
    query = `
           Update tbl_cartera_proyectos set
           estatus = 3 where id_cartera_proyecto = ?
           `
    connection.query(query,[req.body.id],(err, rows, fields) => {
      if (err) return res.status(500).send('Error del servidor.' + err);
      if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
      res.status(200).json({
        rows
      });
    })
  })

  Router.post("/rechazar_proyecto", (req, res) => {
      
    query = `
           Update tbl_cartera_proyectos set
           estatus = 4, observaciones = ? where id_cartera_proyecto = ?
           `
    connection.query(query,[req.body.observaciones, req.body.id],(err, rows, fields) => {
      if (err) return res.status(500).send('Error del servidor.' + err);
      if (rows.length < 1) return res.status(404).send('Datos Incorrentos.');
      res.status(200).json({
        rows
      });
    })
  })
  
  Router.get("/imprimir_cartera", (req, res) => {
      // console.log(req.query)
  var data = req.query;
  query = `
          SELECT descripcion, titulo, nombre, cargo FROM fefom_db.cat_municipio
          join cat_cargo on cat_municipio.id_cargo = cat_cargo.id_cargo
          where cat_municipio.id_municipio = ?;
           `;
           
  connection.query(
  query,
  [data.id_municipio],
    (err, rows, fields) => {      
      if (err) return res.status(500).send("Error del servidor." + err);
      var html = formatoCartera(data,rows);
      var config = {

        "format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "border": {
          "top": "0.5cm",            // default is 0, units: mm, cm, in, px
          "right": "1cm",
          "bottom": "0.5cm",
          "left": "1cm"
        },
        paginationOffset: 1, // Override the initial pagination number
        "footer": {
          "height": "35mm",
          "contents":{
            default: `<table style="width: 100%;" border="0"><tr><td style="text-align: center; font-family:Arial, sans-serif;font-size:11px; font-weight: normal">
            {{page}}
        </td></tr></table>`
          }
         
        },
        "orientation": "landscape",
        "header": {
          "height": "0mm",
        },
      }
      pdf.create(html, config).toStream(function (err, stream) {
        res.setHeader('Content-disposition', 'attachment; filename=ficha_tecnica.pdf');
        res.setHeader('Content-type', 'application/pdf');
        stream.pipe(res);
      });
    }
  );
  });

module.exports = Router;
