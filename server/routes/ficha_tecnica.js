const express = require("express");
const Router = express.Router();
const connection = require("../db/db");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
var pdf = require("html-pdf");
var formatoFicha = require("../formatoFicha");
var fechaLimite = require("../fechaLimite");

app = express();
var baseURL = "";
if ((process.env.NODE_ENV || "").trim() === "production") {
  console.log("Prod");
  baseURL = "./dist";
} else {
  console.log("Dev");
  baseURL = "./public";
}
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, baseURL + "/uploads/imgfichas/");
    // cb(null, "./uploads/imgfichas/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
var upload = multer({ storage: storage });
Router.post("/upload", upload.single("file"), async (req, res) => {
  // upload.single("file"),
  res.status(200).send(req.file.filename);
});

Router.post("/delete", (req, res) => {
  console.log(req.body.imagen);
  fs.unlink(baseURL + "./uploads/imgfichas/" + req.body.imagen, err => {
  // fs.unlink(baseURL + "./uploads/imgfichas/" + req.body.imagen, err => {
    if (err) throw err;
    // if no error, file has been deleted successfully
    // console.log('File deleted!');
    res.status(200).send("File deleted");
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
    [data.id_ficha_tecnica, data.id_ayuntamiento],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/buscar_ficha_fefom", (req, res) => {
  var data = req.body;
  // console.log(data.usuario);
  var subCondicion = "";
  if (data.usuario.tipo_rol == 1) {
    subCondicion = `and asignacion.id_usuario_destinatario = ${data.usuario.id_usuario}`;
  }
  query = `
  SELECT 
    ficha.*
  FROM
    fefom_db.tbl_ficha_tecnica AS ficha
        LEFT JOIN
    tbl_asignaciones asignacion ON ficha.id_asignacion_actual = asignacion.id_asignacion
  WHERE
    ficha.id_ficha_tecnica = ? and
    ficha.estatus in (2,3,4)
    ${subCondicion}
           `;
  connection.query(query, [data.id_ficha_tecnica], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_anexo_uno", (req, res) => {
  var data = req.body;
  query = `
  SELECT uno.*,proyecto.id_municipio, proyecto.nombre_proyecto, tipo_ppi.tipo, municipio.descripcion FROM tbl_anexo_uno as uno
            join tbl_cartera_proyectos as proyecto on uno.id_cartera_proyecto = proyecto.id_cartera_proyecto
            join cat_tipo_ppi as tipo_ppi on uno.id_tipo_ppi = tipo_ppi.id_tipo_ppi
            join cat_municipio as municipio on proyecto.id_municipio = municipio.id_municipio
            WHERE id_anexo_uno = ?
           `;
  connection.query(query, [data.id_anexo_uno], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_anexo_dos", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_dos
            WHERE id_anexo_dos = ?
           `;
  connection.query(query, [data.id_anexo_dos], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_anexo_tres", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_tres
            WHERE id_anexo_tres = ?
           `;
  connection.query(query, [data.id_anexo_tres], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_anexo_cuatro", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_cuatro
            WHERE id_anexo_cuatro = ?
           `;
  connection.query(query, [data.id_anexo_cuatro], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_anexo_cinco", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_cinco
            WHERE id_anexo_cinco = ?
           `;
  connection.query(query, [data.id_anexo_cinco], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_anexo_seis", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_seis
            WHERE id_anexo_seis = ?
           `;
  connection.query(query, [data.id_anexo_seis], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_anexo_siete", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_siete
            WHERE id_anexo_siete = ?
           `;
  connection.query(query, [data.id_anexo_siete], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_anexo_nueve", (req, res) => {
  var data = req.body;
  query = `
            SELECT * FROM tbl_anexo_nueve
            WHERE id_anexo_nueve = ?
           `;
  connection.query(query, [data.id_anexo_nueve], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_fichas_tecnicas", (req, res) => {
  var data = req.body;
  query = `
        SELECT 
        ficha.*,cartera.nombre_proyecto
        FROM
        fefom_db.tbl_ficha_tecnica AS ficha
          LEFT JOIN
        tbl_anexo_uno AS uno ON ficha.id_anexo_uno = uno.id_anexo_uno
          LEFT JOIN
        tbl_cartera_proyectos AS cartera ON uno.id_cartera_proyecto = cartera.id_cartera_proyecto
        WHERE
        ficha.id_ayuntamiento = ?
        ORDER BY ficha.id_ficha_tecnica DESC;
           `;
  // console.log(query, data.id_usuario)
  connection.query(query, [data.id_ayuntamiento], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_asignaciones", (req, res) => {
  var data = req.body;
  query = `
      SELECT 
        ficha.id_ficha_tecnica,
        ficha.version,
        municipio.descripcion AS ayuntamiento,
        cartera.nombre_proyecto,
        ficha.monto_con_iva,
        usuario.nombre,
        usuario.tipo_usuario,
        asignacion.fecha_asignacion,
        asignacion.observacion
      FROM
        fefom_db.tbl_ficha_tecnica AS ficha
            LEFT JOIN
        tbl_anexo_uno AS uno ON ficha.id_anexo_uno = uno.id_anexo_uno
            LEFT JOIN
        tbl_cartera_proyectos AS cartera ON uno.id_cartera_proyecto = cartera.id_cartera_proyecto
            LEFT JOIN
        cat_municipio AS municipio ON ficha.id_ayuntamiento = municipio.id_municipio
            LEFT JOIN
        tbl_asignaciones asignacion ON ficha.id_asignacion_actual = asignacion.id_asignacion
            LEFT JOIN
        cat_usuario usuario ON asignacion.id_usuario_remitente = usuario.id_usuario
      WHERE
        asignacion.id_usuario_destinatario = ?
            AND ficha.estatus in (2,3,4)
      ORDER BY fecha_asignacion DESC;
           `;
  // console.log(query, data.id_usuario)
  connection.query(query, [data.id_usuario], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_detalle_fichas", (req, res) => {
  var data = req.body;
  // console.log(data)
  var where = ``; 
  if(data.filtros){
    if (data.filtros.folio!==null && data.filtros.folio!=="")  where+=`and ficha.id_ficha_tecnica = ${data.filtros.folio}` 
    if (data.filtros.nombreProyecto!==null && data.filtros.nombreProyecto!=="")  where+=` and cartera.nombre_proyecto like '%${data.filtros.nombreProyecto}%'` 
    if (data.filtros.monto!==null && data.filtros.monto!=="")  where+=` and ficha.monto_con_iva = ${data.filtros.monto}` 
    if (data.filtros.municipio!==null && data.filtros.municipio!=="")  where+=` and municipio.id_municipio = ${data.filtros.municipio}` 
    if (data.filtros.fechaCaptura!==null && data.filtros.fechaCaptura!=="")  where+=` and ficha.fecha_ficha = ${data.filtros.fechaCaptura}` 
  }
  
  // if (data.filtros.unidadEjecutora!==null)  where+=` and municipio.id_ayuntamiento = ${data.filtros.municipio}` 
  query = `
          SELECT 
            usuario.nombre,
            ficha.id_ficha_tecnica,
            ficha.version,
            ficha.fecha_ficha,
            ficha.fecha_primer_ingreso,
            ficha.fecha_envio,
            ficha.fecha_revision,
            ficha.fecha_validacion,
            ficha.fecha_dictaminacion,
            ficha.fecha_limite_ayuntamiento,
            ficha.fecha_limite_revision,
            ficha.estatus,
            municipio.descripcion AS ayuntamiento,
            cartera.nombre_proyecto,
            ficha.monto_con_iva
          FROM
            fefom_db.tbl_ficha_tecnica AS ficha
                LEFT JOIN
            tbl_anexo_uno AS uno ON ficha.id_anexo_uno = uno.id_anexo_uno
                LEFT JOIN
            tbl_cartera_proyectos AS cartera ON uno.id_cartera_proyecto = cartera.id_cartera_proyecto
                LEFT JOIN
            cat_municipio AS municipio ON ficha.id_ayuntamiento = municipio.id_municipio
                LEFT JOIN
            cat_usuario usuario ON ficha.id_analista_asignado = usuario.id_usuario
          WHERE
            ficha.id_analista_asignado IS NOT NULL
            ${where}
            ORDER BY usuario.nombre DESC, ficha.fecha_envio DESC; 
           `;
  //  console.log(query)
  connection.query(query, [data.id_usuario], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/buscar_historial", (req, res) => {
  var data = req.body;
  query = `
        SELECT 
          asignaciones.id_usuario_destinatario,
          destinatario.nombre as nombre_destinatario,
          asignaciones.id_usuario_remitente,
          remitente.nombre as nombre_remitente,
          asignaciones.fecha_asignacion,
          asignaciones.observacion
        FROM
          fefom_db.tbl_asignaciones asignaciones
              LEFT JOIN
          cat_usuario destinatario ON destinatario.id_usuario = asignaciones.id_usuario_destinatario
              LEFT JOIN
          cat_usuario remitente ON remitente.id_usuario = asignaciones.id_usuario_remitente
        WHERE
          id_ficha_tecnica = ?
        ORDER BY fecha_asignacion DESC; 
           `;
  // console.log(query, data.id_usuario)
  connection.query(query, [data.id_ficha_tecnica], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    res.status(200).send(rows);
  });
});

Router.post("/guardar_anexo_uno", (req, res) => {
  var data = req.body;
  // console.log(data);
  var query = "";
  if (data.id_anexo_uno == null) {
    query = `insert into tbl_anexo_uno
         (estatus,id_cartera_proyecto, id_tipo_ppi, subclasificacion_ppi, monto_con_iva, monto_sin_iva, monto_estudios, fuentes_financiamiento, fecha_inicio_ejecucion, meses_ejecucion, anios_operacion, calendario_inversion, localizacion_geografica, ruta_imagen_localizacion,latitud,longitud)
         values
         (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
  } else {
    query = `
         UPDATE tbl_anexo_uno SET
         estatus=1,
            id_cartera_proyecto = ?,
            id_tipo_ppi=?,
            subclasificacion_ppi=?,
            monto_con_iva=?,
            monto_sin_iva=?,
            monto_estudios=?,
            fuentes_financiamiento=?,
            fecha_inicio_ejecucion=?,
            meses_ejecucion=?,
            anios_operacion=?,
            calendario_inversion=?,
            localizacion_geografica=?,
            ruta_imagen_localizacion=?,
            latitud = ?,
            longitud = ?
          WHERE 
            id_anexo_uno=?;
           `;
  }

  connection.query(
    query,
    [
      data.id_cartera_proyecto,
      data.id_tipo_ppi,
      data.subclasificacion_ppi,
      data.monto_con_iva,
      data.monto_sin_iva,
      data.monto_estudios,
      data.fuentes_financiamiento,
      data.fecha_inicio_ejecucion,
      data.meses_ejecucion,
      data.anios_operacion,
      data.calendario_inversion,
      data.localizacion_geografica,
      data.ruta_imagen_localizacion,
      data.latitud,
      data.longitud,
      data.id_anexo_uno
    ],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      if (data.id_ficha_tecnica == null) {
        query = `insert into tbl_ficha_tecnica
          (ejercicio, id_ayuntamiento, id_usuario, estatus, fecha_ficha, fecha_creacion, version,monto_con_iva, id_anexo_uno)
          values
          (?, ?, ?, 0, NOW(), NOW(), 1,?, ?)`;

        connection.query(
          query,
          [
            data.ejercicio,
            data.id_ayuntamiento,
            data.id_usuario,
            data.monto_con_iva,
            rows.insertId
          ],
          (err, result, fields) => {
            if (err) return res.status(500).send(err);
            res
              .status(200)
              .send({
                id_ficha_tecnica: result.insertId,
                id_anexo_uno: rows.insertId
              });
          }
        );
      } else {
        query = `UPDATE tbl_ficha_tecnica SET
                monto_con_iva = ?
              WHERE 
                id_ficha_tecnica=?;
              `;

        connection.query(
          query,
          [data.monto_con_iva, data.id_ficha_tecnica],
          (err, result, fields) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ id_ficha_tecnica: data.id_ficha_tecnica });
          }
        );
      }
    }
  );
});

Router.post("/guardar_anexo_dos", (req, res) => {
  var data = req.body;
  var query = "";
  if (data.id_anexo_dos == null) {
    query = `insert into tbl_anexo_dos
         (estatus,alineacion_estrategica, proyecto_complementario, relacion_complementaria)
         values
         (1, ?, ?, ?)`;
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

  connection.query(
    query,
    [
      data.alineacion_estrategica,
      data.proyecto_complementario,
      data.relacion_complementaria,
      data.id_anexo_dos
    ],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      if (data.id_anexo_dos == null) {
        query2 = `
         UPDATE tbl_ficha_tecnica SET
          id_anexo_dos=?
          WHERE 
            id_ficha_tecnica=?
           `;
        connection.query(
          query2,
          [rows.insertId, data.id_ficha_tecnica],
          (err2, rows2, fields) => {
            if (err2) return res.status(500).send(err2);
            res.status(200).send({ id_anexo_dos: rows.insertId });
          }
        );
      } else {
        res.status(200).send({ id_anexo_dos: data.id_anexo_dos });
      }
    }
  );
});

Router.post("/guardar_anexo_tres", (req, res) => {
  var data = req.body;
  var query = "";
  if (data.id_anexo_tres == null) {
    query = `insert into tbl_anexo_tres
         (estatus,descripcion_problematica,imagenes, analisis_oferta, analisis_demanda, variables_relevantes)
         values
         (1, ?, ?, ?, ?, ?)`;
  } else {
    query = `
         UPDATE tbl_anexo_tres SET
         estatus=1,
         descripcion_problematica=?,
         imagenes=?,
         analisis_oferta=?,
         analisis_demanda=?,
         variables_relevantes=?
          WHERE 
            id_anexo_tres=?
           `;
  }

  connection.query(
    query,
    [
      data.descripcion_problematica,
      data.imagenes,
      data.analisis_oferta,
      data.analisis_demanda,
      data.variables_relevantes,
      data.id_anexo_tres
    ],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      if (data.id_anexo_tres == null) {
        query2 = `
         UPDATE tbl_ficha_tecnica SET
          id_anexo_tres=?
          WHERE 
            id_ficha_tecnica=?
           `;
        connection.query(
          query2,
          [rows.insertId, data.id_ficha_tecnica],
          (err2, rows2, fields) => {
            if (err2) return res.status(500).send(err2);
            res.status(200).send({ id_anexo_tres: rows.insertId });
          }
        );
      } else {
        res.status(200).send({ id_anexo_tres: data.id_anexo_tres });
      }
    }
  );
});

Router.post("/guardar_anexo_cuatro", (req, res) => {
  var data = req.body;
  var query = "";
  if (data.id_anexo_cuatro == null) {
    query = `insert into tbl_anexo_cuatro
         (estatus,medida_optimizacion,descripcion_optimizacion, analisis_oferta_sin_proyecto, analisis_demanda_sin_proyecto)
         values
         (1, ?, ?, ?, ?)`;
  } else {
    query = `
         UPDATE tbl_anexo_cuatro SET
         estatus=1,
         medida_optimizacion=?,
         descripcion_optimizacion=?,
         analisis_oferta_sin_proyecto=?,
         analisis_demanda_sin_proyecto=?
          WHERE 
            id_anexo_cuatro=?
           `;
  }

  connection.query(
    query,
    [
      data.medida_optimizacion,
      data.descripcion_optimizacion,
      data.analisis_oferta_sin_proyecto,
      data.analisis_demanda_sin_proyecto,
      data.id_anexo_cuatro
    ],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      if (data.id_anexo_cuatro == null) {
        query2 = `
         UPDATE tbl_ficha_tecnica SET
          id_anexo_cuatro=?
          WHERE 
            id_ficha_tecnica=?
           `;
        connection.query(
          query2,
          [rows.insertId, data.id_ficha_tecnica],
          (err2, rows2, fields) => {
            if (err2) return res.status(500).send(err2);
            res.status(200).send({ id_anexo_cuatro: rows.insertId });
          }
        );
      } else {
        res.status(200).send({ id_anexo_cuatro: data.id_anexo_cuatro });
      }
    }
  );
});

Router.post("/guardar_anexo_cinco", (req, res) => {
  var data = req.body;
  var query = "";
  if (data.id_anexo_cinco == null) {
    query = `insert into tbl_anexo_cinco
         (estatus,alternativas_costos,justificacion)
         values
         (1, ?, ?)`;
  } else {
    query = `
         UPDATE tbl_anexo_cinco SET
         estatus=1,
         alternativas_costos=?,
         justificacion=?
          WHERE 
            id_anexo_cinco=?
           `;
  }

  connection.query(
    query,
    [data.alternativas_costos, data.justificacion, data.id_anexo_cinco],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      if (data.id_anexo_cinco == null) {
        query2 = `
         UPDATE tbl_ficha_tecnica SET
          id_anexo_cinco=?
          WHERE 
            id_ficha_tecnica=?
           `;
        connection.query(
          query2,
          [rows.insertId, data.id_ficha_tecnica],
          (err2, rows2, fields) => {
            if (err2) return res.status(500).send(err2);
            res.status(200).send({ id_anexo_cinco: rows.insertId });
          }
        );
      } else {
        res.status(200).send({ id_anexo_cinco: data.id_anexo_cinco });
      }
    }
  );
});

Router.post("/guardar_anexo_seis", (req, res) => {
  var data = req.body;
  var query = "";
  if (data.id_anexo_seis == null) {
    query = `insert into tbl_anexo_seis
         (estatus,descripcion_general,componentes,aspecto_ambiental,aspecto_tecnico,aspecto_legal,analisis_oferta_proyecto,analisis_demanda_proyecto,diagnostico,ruta_imagen_proyecto,latitud_plano, longitud_plano)
         values
         (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  } else {
    query = `
         UPDATE tbl_anexo_seis SET
         estatus=1,
         descripcion_general = ?,
         componentes = ?,
         aspecto_ambiental = ?,  
         aspecto_tecnico = ?,
         aspecto_legal = ?,
         analisis_oferta_proyecto = ?,
         analisis_demanda_proyecto = ?,
         diagnostico = ?,
         ruta_imagen_proyecto = ?,
         latitud_plano = ?,
         longitud_plano = ?
          WHERE 
            id_anexo_seis=?
           `;
  }

  connection.query(
    query,
    [
      data.descripcion_general,
      data.componentes,
      data.aspecto_ambiental,
      data.aspecto_tecnico,
      data.aspecto_legal,
      data.analisis_oferta_proyecto,
      data.analisis_demanda_proyecto,
      data.diagnostico,
      data.ruta_imagen_proyecto,
      data.latitud,
      data.longitud,
      data.id_anexo_seis
    ],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      if (data.id_anexo_seis == null) {
        query2 = `
         UPDATE tbl_ficha_tecnica SET
          id_anexo_seis=?
          WHERE 
            id_ficha_tecnica=?
           `;
        connection.query(
          query2,
          [rows.insertId, data.id_ficha_tecnica],
          (err2, rows2, fields) => {
            if (err2) return res.status(500).send(err2);
            res.status(200).send({ id_anexo_seis: rows.insertId });
          }
        );
      } else {
        res.status(200).send({ id_anexo_seis: data.id_anexo_seis });
      }
    }
  );
});

Router.post("/guardar_anexo_siete", (req, res) => {
  var data = req.body;
  var query = "";
  if (data.id_anexo_siete == null) {
    query = `insert into tbl_anexo_siete
         (estatus, costos, beneficios)
         values
         (1, ?, ?)`;
  } else {
    query = `
         UPDATE tbl_anexo_siete SET
         estatus=1,
         costos = ?,
         beneficios = ?
          WHERE 
            id_anexo_siete=?
           `;
  }

  connection.query(
    query,
    [data.costos, data.beneficios, data.id_anexo_siete],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      if (data.id_anexo_siete == null) {
        query2 = `
         UPDATE tbl_ficha_tecnica SET
          id_anexo_siete=?
          WHERE 
            id_ficha_tecnica=?
           `;
        connection.query(
          query2,
          [rows.insertId, data.id_ficha_tecnica],
          (err2, rows2, fields) => {
            if (err2) return res.status(500).send(err2);
            res.status(200).send({ id_anexo_siete: rows.insertId });
          }
        );
      } else {
        res.status(200).send({ id_anexo_siete: data.id_anexo_siete });
      }
    }
  );
});

Router.post("/guardar_anexo_nueve", (req, res) => {
  var data = req.body;
  var query = "";
  if (data.id_anexo_nueve == null) {
    query = `insert into tbl_anexo_nueve
         (estatus,comentarios_finales,ramo,entidad,area_responsable,nombre,cargo,responsable_informacion,cargo_responsable_informacion,telefono_responsable_informacion,email_responsable_informacion)
         values
         (1, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)`;
  } else {
    query = `
         UPDATE tbl_anexo_nueve SET
         estatus=1,
          comentarios_finales = ?,
          ramo = ?,
          entidad = ?,
          area_responsable = ?,
          nombre = ?,
          cargo = ?,
          responsable_informacion = ?,
          cargo_responsable_informacion = ?,
          telefono_responsable_informacion = ?,
          email_responsable_informacion = ?
          WHERE 
            id_anexo_nueve=?
           `;
  }

  connection.query(
    query,
    [
      data.comentarios_finales,
      data.ramo,
      data.entidad,
      data.area_responsable,
      data.nombre,
      data.cargo,
      data.responsable_informacion,
      data.cargo_responsable_informacion,
      data.telefono_responsable_informacion,
      data.email_responsable_informacion,
      data.id_anexo_nueve
    ],
    (err, rows, fields) => {
      if (err) return res.status(500).send(err);
      if (data.id_anexo_nueve == null) {
        query2 = `
         UPDATE tbl_ficha_tecnica SET
          id_anexo_nueve=?
          WHERE 
            id_ficha_tecnica=?
           `;
        connection.query(
          query2,
          [rows.insertId, data.id_ficha_tecnica],
          (err2, rows2, fields) => {
            if (err2) return res.status(500).send(err2);
            res.status(200).send({ id_anexo_nueve: rows.insertId });
          }
        );
      } else {
        res.status(200).send({ id_anexo_nueve: data.id_anexo_nueve });
      }
    }
  );
});


Router.post("/cerrar_ficha", (req, res) => {
  var data = req.body;
  var id_analista = 0;
  if(data.id_analista_asignado==null){
    var queryAnalistaDisponible = `
    SELECT 
      gen.id_usuario, COUNT(gen.id_ficha_tecnica) AS total
    FROM
      (SELECT 
          usuario.id_usuario, fichas.id_ficha_tecnica
      FROM
          cat_usuario AS usuario
      LEFT JOIN (SELECT 
          *
      FROM
          tbl_ficha_tecnica
      WHERE
          estatus = 2) AS fichas ON usuario.id_usuario = fichas.id_analista_asignado
      WHERE
          usuario.tipo_rol = 1) AS gen
    GROUP BY gen.id_usuario
    ORDER BY total
    LIMIT 1;
    `;
  
    connection.query(queryAnalistaDisponible, (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor al buscar analista disponible." + err);
      id_analista = rows[0].id_usuario;
      
      query = `
            UPDATE tbl_ficha_tecnica SET
              estatus = 2,
              fecha_primer_ingreso = now(),
              fecha_envio = now(),
              fecha_revision = null,
              fecha_limite_ayuntamiento = null,
              fecha_limite_revision = '${fechaLimite(12)}',
              version = ?,
              id_analista_asignado = ?
            WHERE 
              id_ficha_tecnica=?
                  `;
    connection.query(
      query,
      [data.version + 1, id_analista, data.id_ficha_tecnica],
      (err, rows, fields) => {
        if (err) return res.status(500).send("Error del servidor." + err);

        var queryAsignacion = `
                INSERT INTO tbl_asignaciones
                  (id_ficha_tecnica, id_usuario_destinatario, id_usuario_remitente, fecha_asignacion)
                VALUES
                  (?,?,?,NOW())
              `;
        connection.query(
          queryAsignacion,
          [data.id_ficha_tecnica, id_analista, data.id_usuario],
          (err, rows, fields) => {
            if (err) return res.status(500).send("Error del servidor." + err);
            res.status(200).send(rows);
          }
        );
      }
    );
    });
  }else{
    id_analista = data.id_analista_asignado
    query = `
            UPDATE tbl_ficha_tecnica SET
              estatus = 2,
              fecha_envio = now(),
              fecha_revision = null,
              fecha_limite_ayuntamiento = null,
              fecha_limite_revision = '${fechaLimite(12)}',
              version = ?,
              id_analista_asignado = ?
            WHERE 
              id_ficha_tecnica=?
                  `;
    connection.query(
      query,
      [data.version + 1, id_analista, data.id_ficha_tecnica],
      (err, rows, fields) => {
        if (err) return res.status(500).send("Error del servidor." + err);

        var queryAsignacion = `
                INSERT INTO tbl_asignaciones
                  (id_ficha_tecnica, id_usuario_destinatario, id_usuario_remitente, fecha_asignacion)
                VALUES
                  (?,?,?,NOW())
              `;
        connection.query(
          queryAsignacion,
          [data.id_ficha_tecnica, id_analista, data.id_usuario],
          (err, rows, fields) => {
            if (err) return res.status(500).send("Error del servidor." + err);
            res.status(200).send(rows);
          }
        );
      }
    );
  }
});

Router.post("/cancelar_ficha", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_ficha_tecnica SET
      estatus = 6
    WHERE 
      id_ficha_tecnica=?
           `;
  connection.query(
    query,
    [data.id_ficha_tecnica],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_observaciones_anexo_uno", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_anexo_uno SET
      estatus = 3,
      observaciones = ?
    WHERE 
      id_anexo_uno=?
           `;
  connection.query(
    query,
    [data.observaciones, data.id_anexo_uno],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_observaciones_anexo_dos", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_anexo_dos SET
      estatus = 3,
      observaciones = ?
    WHERE 
      id_anexo_dos=?
           `;
  connection.query(
    query,
    [data.observaciones, data.id_anexo_dos],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_observaciones_anexo_tres", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_anexo_tres SET
      estatus = 3,
      observaciones = ?
    WHERE 
      id_anexo_tres=?
           `;
  connection.query(
    query,
    [data.observaciones, data.id_anexo_tres],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_observaciones_anexo_cuatro", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_anexo_cuatro SET
      estatus = 3,
      observaciones = ?
    WHERE 
      id_anexo_cuatro=?
           `;
  connection.query(
    query,
    [data.observaciones, data.id_anexo_cuatro],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_observaciones_anexo_cinco", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_anexo_cinco SET
      estatus = 3,
      observaciones = ?
    WHERE 
      id_anexo_cinco=?
           `;
  connection.query(
    query,
    [data.observaciones, data.id_anexo_cinco],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_observaciones_anexo_seis", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_anexo_seis SET
      estatus = 3,
      observaciones = ?
    WHERE 
      id_anexo_seis=?
           `;
  connection.query(
    query,
    [data.observaciones, data.id_anexo_seis],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_observaciones_anexo_siete", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_anexo_siete SET
      estatus = 3,
      observaciones = ?
    WHERE 
      id_anexo_siete=?
           `;
  connection.query(
    query,
    [data.observaciones, data.id_anexo_siete],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/guardar_observaciones_anexo_nueve", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_anexo_nueve SET
      estatus = 3,
      observaciones = ?
    WHERE 
      id_anexo_nueve=?
           `;
  connection.query(
    query,
    [data.observaciones, data.id_anexo_nueve],
    (err, rows, fields) => {
      if (err) return res.status(500).send("Error del servidor." + err);
      res.status(200).send(rows);
    }
  );
});

Router.post("/validar_anexo_uno", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_uno SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_uno=?;
           `;
  connection.query(query, [data.id_anexo_uno], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/validar_anexo_dos", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_dos SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_dos=?;
           `;
  connection.query(query, [data.id_anexo_dos], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/validar_anexo_tres", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_tres SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_tres=?;
           `;
  connection.query(query, [data.id_anexo_tres], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/validar_anexo_cuatro", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_cuatro SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_cuatro=?;
           `;
  connection.query(query, [data.id_anexo_cuatro], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/validar_anexo_cinco", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_cinco SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_cinco=?;
           `;
  connection.query(query, [data.id_anexo_cinco], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/validar_anexo_seis", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_seis SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_seis=?;
           `;
  connection.query(query, [data.id_anexo_seis], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/validar_anexo_siete", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_siete SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_siete=?;
           `;
  connection.query(query, [data.id_anexo_siete], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/validar_anexo_ocho", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_siete SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_siete=?;
           `;
  connection.query(query, [data.id_anexo_siete], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/validar_anexo_nueve", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
         UPDATE tbl_anexo_nueve SET
            estatus = 2,
            observaciones = null
          WHERE 
            id_anexo_nueve=?;
           `;
  connection.query(query, [data.id_anexo_nueve], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("ok");
  });
});

Router.post("/regresar_ficha", (req, res) => {
  var data = req.body;
  query = `
    UPDATE tbl_ficha_tecnica SET
      estatus = 1,
      fecha_envio = now(),
    WHERE 
      id_ficha_tecnica=?
          `;
  connection.query(query, [data.id_ficha_tecnica], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);

    var queryAsignacion = `
        INSERT INTO tbl_asignaciones
          (id_ficha_tecnica, id_usuario_destinatario, id_usuario_remitente, fecha_asignacion)
        VALUES
          (?,?,?,NOW())
      `;
    connection.query(
      queryAsignacion,
      [data.id_ficha_tecnica, data.id_ayuntamiento, data.id_usuario],
      (err, rows, fields) => {
        if (err) return res.status(500).send("Error del servidor." + err);
        res.status(200).send(rows);
      }
    );
  });
});

Router.post("/cerrar_revision", (req, res) => {
  var data = req.body;
  var query = "";
  query = `
    SELECT 
    ficha.id_ficha_tecnica,
      uno.estatus AS estatus_uno,
      dos.estatus AS estatus_dos,
      tres.estatus AS estatus_tres,
      cuatro.estatus AS estatus_cuatro,
      cinco.estatus AS estatus_cinco,
      seis.estatus AS estatus_seis,
      siete.estatus AS estatus_siete,
      nueve.estatus AS estatus_nueve
  FROM
      tbl_ficha_tecnica AS ficha
          JOIN
      tbl_anexo_uno AS uno ON uno.id_anexo_uno = ficha.id_anexo_uno
          JOIN
      tbl_anexo_dos AS dos ON dos.id_anexo_dos = ficha.id_anexo_dos
          JOIN
      tbl_anexo_tres AS tres ON tres.id_anexo_tres = ficha.id_anexo_tres
          JOIN
      tbl_anexo_cuatro AS cuatro ON cuatro.id_anexo_cuatro = ficha.id_anexo_cuatro
          JOIN
      tbl_anexo_cinco AS cinco ON cinco.id_anexo_cinco = ficha.id_anexo_cinco
          JOIN
      tbl_anexo_seis AS seis ON seis.id_anexo_seis = ficha.id_anexo_seis
          JOIN
      tbl_anexo_siete AS siete ON siete.id_anexo_siete = ficha.id_anexo_siete
          JOIN
      tbl_anexo_nueve AS nueve ON nueve.id_anexo_nueve = ficha.id_anexo_nueve
  WHERE
      id_ficha_tecnica = ?
          AND (uno.estatus != 1 AND dos.estatus != 1
          AND tres.estatus != 1
          AND cuatro.estatus != 1
          AND cinco.estatus != 1
          AND seis.estatus != 1
          AND siete.estatus != 1
          AND nueve.estatus != 1)
           `;
  connection.query(query, [data.id_ficha_tecnica], (err, rows, fields) => {
    if (err) return res.status(500).send(err);
    if (rows.length == 0) {
      return res.status(202).send({ error: 1 });
    } else {
      var campoFecha = ""
      switch (data.tipo_envio) {
        case 1:
          //REGRESAR A AYUNTAMIENTO
          var estatus = 5;
          var id_usuario_destinatario = data.id_usuario_ayuntamiento;
          var id_usuario_remitente = data.id_usuario;
          var statusCode = 201;
          var observacion = data.observacion
          // console.log(fecha_limite)
          campoFecha = `, fecha_envio = now(),fecha_limite_revision = null,fecha_limite_ayuntamiento = '${(fechaLimite(10))}'`
          queryUpdate = `
            UPDATE tbl_ficha_tecnica SET
              estatus = ${estatus}
              ${campoFecha}
            WHERE 
              id_ficha_tecnica=?
                  `;
            connection.query(
              queryUpdate,
              [data.id_ficha_tecnica],
              function (err, rows, fields) {
                // console.log(this.sql)
                if (err) return res.status(500).send("Error del servidor." + err);
                  
                var queryAsignacion = `
                INSERT INTO tbl_asignaciones
                  (id_ficha_tecnica, id_usuario_destinatario, id_usuario_remitente, fecha_asignacion, observacion)
                VALUES
                  (?,?,?,NOW(),?)
              `;
                connection.query(
                  queryAsignacion,
                  [
                    data.id_ficha_tecnica,
                    id_usuario_destinatario,
                    id_usuario_remitente,
                    observacion
                  ],
                  (err, rows, fields) => {
                    if (err) return res.status(500).send("Error del servidor." + err);
                    res.status(statusCode).send("ok");
                  }
                );
              }
            );
          break;
        case 2:
          //ENVIAR A VALIDACIÓN
          var estatus = 3;
          var id_usuario_destinatario = 0;
          var id_usuario_remitente = data.id_usuario;
          var statusCode = 200;
          
          var observacion = data.observacion
          if(data.id_subdirector_asignado == null){
            var querySubdirectorDisponible = `
              SELECT 
                gen.id_usuario, COUNT(gen.id_ficha_tecnica) AS total
              FROM
                (SELECT 
                  usuario.id_usuario, fichas.id_ficha_tecnica
                FROM
                    cat_usuario AS usuario
                LEFT JOIN (SELECT 
                                *
                            FROM
                                tbl_ficha_tecnica
                            WHERE
                                estatus = 3) AS fichas ON usuario.id_usuario = fichas.id_subdirector_asignado
              WHERE
                  usuario.tipo_rol = 2) AS gen
              GROUP BY gen.id_usuario
              ORDER BY total
              LIMIT 1;
              `;
                
              connection.query(querySubdirectorDisponible, (err, rows, fields) => {
                if (err) return res.status(500).send("Error del servidor." + err);
                id_usuario_destinatario = rows[0].id_usuario;
                campoFecha = `, fecha_revision = now(), id_subdirector_asignado = ${id_usuario_destinatario}`
                console.log(id_usuario_destinatario)
                // CREAR OTRA FUNCION PARA ENCADENAR LOS SQL YA QUE NO SE ACTUALIZA EN LA FICHA EL SUBDIRECTOR ASIGNADO
                queryUpdate = `
                  UPDATE tbl_ficha_tecnica SET
                    estatus = ${estatus}
                    ${campoFecha}
                  WHERE 
                    id_ficha_tecnica=?
                        `;
                  connection.query(
                    queryUpdate,
                    [data.id_ficha_tecnica],
                    function (err, rows, fields) {
                      if (err) return res.status(500).send("Error del servidor." + err);
                        console.log(this.sql)
                      var queryAsignacion = `
                      INSERT INTO tbl_asignaciones
                        (id_ficha_tecnica, id_usuario_destinatario, id_usuario_remitente, fecha_asignacion, observacion)
                      VALUES
                        (?,?,?,NOW(),?)
                    `;
                      connection.query(
                        queryAsignacion,
                        [
                          data.id_ficha_tecnica,
                          id_usuario_destinatario,
                          id_usuario_remitente,
                          observacion
                        ],
                        (err, rows, fields) => {
                          if (err) return res.status(500).send("Error del servidor." + err);
                          res.status(statusCode).send("ok");
                        }
                      );
                    }
                  );
              });
          }else{
            id_usuario_destinatario = data.id_subdirector_asignado
            console.log(id_usuario_destinatario)
            campoFecha = `, fecha_revision = now(), id_subdirector_asignado = ${id_usuario_destinatario}`
            queryUpdate = `
              UPDATE tbl_ficha_tecnica SET
                estatus = ${estatus}
                ${campoFecha}
              WHERE 
                id_ficha_tecnica=?
                    `;
              connection.query(
                queryUpdate,
                [data.id_ficha_tecnica],
                function (err, rows, fields) {
                  if (err) return res.status(500).send("Error del servidor." + err);
                    console.log(this.sql)
                  var queryAsignacion = `
                  INSERT INTO tbl_asignaciones
                    (id_ficha_tecnica, id_usuario_destinatario, id_usuario_remitente, fecha_asignacion, observacion)
                  VALUES
                    (?,?,?,NOW(),?)
                `;
                  connection.query(
                    queryAsignacion,
                    [
                      data.id_ficha_tecnica,
                      id_usuario_destinatario,
                      id_usuario_remitente,
                      observacion
                    ],
                    (err, rows, fields) => {
                      if (err) return res.status(500).send("Error del servidor." + err);
                      res.status(statusCode).send("ok");
                    }
                  );
                }
              );
          }
          
          break;

        case 3:
          //REGRESAR A REVISIÓN
          var estatus = 2;
          var id_usuario_destinatario = data.id_analista_asignado;
          var id_usuario_remitente = data.id_usuario;
          var statusCode = 203;
          var observacion = data.observacion
          campoFecha = ", fecha_revision = null"
          queryUpdate = `
            UPDATE tbl_ficha_tecnica SET
              estatus = ${estatus}
              ${campoFecha}
            WHERE 
              id_ficha_tecnica=?
                  `;
            connection.query(
              queryUpdate,
              [data.id_ficha_tecnica],
              function (err, rows, fields) {
                if (err) return res.status(500).send("Error del servidor." + err);
                  console.log(this.sql)
                var queryAsignacion = `
                INSERT INTO tbl_asignaciones
                  (id_ficha_tecnica, id_usuario_destinatario, id_usuario_remitente, fecha_asignacion, observacion)
                VALUES
                  (?,?,?,NOW(),?)
              `;
                connection.query(
                  queryAsignacion,
                  [
                    data.id_ficha_tecnica,
                    id_usuario_destinatario,
                    id_usuario_remitente,
                    observacion
                  ],
                  (err, rows, fields) => {
                    if (err) return res.status(500).send("Error del servidor." + err);
                    res.status(statusCode).send("ok");
                  }
                );
              }
            );
          break;

        default:
          break;
      }
      
    }
  });
});

Router.get("/imprimir_ficha", (req, res) => {
  // console.log(req.query)
  var data = req.query;
  query = `
            select * from tbl_ficha_tecnica as ficha
            join cat_municipio as municipio on municipio.id_municipio = ficha.id_ayuntamiento
            join tbl_anexo_uno as uno on ficha.id_anexo_uno = uno.id_anexo_uno
            join tbl_cartera_proyectos as cartera on cartera.id_cartera_proyecto = uno.id_cartera_proyecto
            join cat_tipo_ppi as ppi on ppi.id_tipo_ppi = uno.id_tipo_ppi
            join tbl_anexo_dos as dos on ficha.id_anexo_dos = dos.id_anexo_dos
            join tbl_anexo_tres as tres on ficha.id_anexo_tres = tres.id_anexo_tres
            join tbl_anexo_cuatro as cuatro on ficha.id_anexo_cuatro = cuatro.id_anexo_cuatro
            join tbl_anexo_cinco as cinco on ficha.id_anexo_cinco = cinco.id_anexo_cinco
            join tbl_anexo_seis as seis on ficha.id_anexo_seis = seis.id_anexo_seis
            join tbl_anexo_siete as siete on ficha.id_anexo_siete = siete.id_anexo_siete
            join tbl_anexo_nueve as nueve on ficha.id_anexo_nueve = nueve.id_anexo_nueve
            where ficha.id_ficha_tecnica = ?
           `;
  connection.query(query, [data.id_ficha_tecnica], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    var html = formatoFicha.formatoFicha(rows);
    //  console.log(path.join(__dirname,'../../public/uploads/'))
    var config = {
      format: "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
      border: {
        top: "1.5cm", // default is 0, units: mm, cm, in, px
        right: "1.5cm",
        bottom: "1.5cm",
        left: "1.5cm"
      },
      // "border": {
      //   "top": "50px", // default is 0, units: mm, cm, in, px
      //   "right": "50px",
      //   "bottom": "50px",
      //   "left": "50px",
      // },

      paginationOffset: 0, // Override the initial pagination number
      footer: {
        height: "0.5cm"
      }
      // "header": {
      //   "height": "45mm",
      //   "contents": '<div style="text-align: center;">Author: Marc Bachmann</div>'
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
    };
    pdf.create(html, config).toStream(function(err, stream) {
      res.setHeader(
        "Content-disposition",
        "attachment; filename=ficha_tecnica.pdf"
      );
      res.setHeader("Content-type", "application/pdf");
      stream.pipe(res);
    });
  });
});

Router.get("/imprimir_observaciones_ficha", (req, res) => {
  // console.log(req.query)
  var data = req.query;
  query = `
        SELECT
          ficha.id_ficha_tecnica,
          ayuntamiento.descripcion,  
          uno.observaciones AS observaciones_uno,
          dos.observaciones AS observaciones_dos,
          tres.observaciones AS observaciones_tres,
          cuatro.observaciones AS observaciones_cuatro,
          cinco.observaciones AS observaciones_cinco,
          seis.observaciones AS observaciones_seis,
          siete.observaciones AS observaciones_siete,
          nueve.observaciones AS observaciones_nueve
        FROM
          fefom_db.tbl_ficha_tecnica ficha
              LEFT JOIN
          cat_municipio ayuntamiento ON ficha.id_ayuntamiento = ayuntamiento.id_municipio
              LEFT JOIN
          tbl_anexo_uno uno ON ficha.id_anexo_uno = uno.id_anexo_uno
              LEFT JOIN
          tbl_anexo_dos dos ON ficha.id_anexo_dos = dos.id_anexo_dos
              LEFT JOIN
          tbl_anexo_tres tres ON ficha.id_anexo_tres = tres.id_anexo_tres
              LEFT JOIN
          tbl_anexo_cuatro cuatro ON ficha.id_anexo_cuatro = cuatro.id_anexo_cuatro
              LEFT JOIN
          tbl_anexo_cinco cinco ON ficha.id_anexo_cinco = cinco.id_anexo_cinco
              LEFT JOIN
          tbl_anexo_seis seis ON ficha.id_anexo_seis = seis.id_anexo_seis
              LEFT JOIN
          tbl_anexo_siete siete ON ficha.id_anexo_siete = siete.id_anexo_siete
              LEFT JOIN
          tbl_anexo_nueve nueve ON ficha.id_anexo_nueve = nueve.id_anexo_nueve
            where ficha.id_ficha_tecnica = ?
           `;
  connection.query(query, [data.id_ficha_tecnica], (err, rows, fields) => {
    if (err) return res.status(500).send("Error del servidor." + err);
    var querySugerencias = `
      select * from cat_sugerencias
    `
    connection.query(querySugerencias,[],(error,rows2,fields)=>{
      if (err) return res.status(500).send("Error del servidor." + err);
      var html = formatoFicha.formatoObservaciones(rows,rows2);
      //  console.log(path.join(__dirname,'../../public/uploads/'))
      var config = {
        format: "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        border: {
          top: "1.5cm", // default is 0, units: mm, cm, in, px
          right: "1.5cm",
          bottom: "1.5cm",
          left: "1.5cm"
        },
        // "border": {
        //   "top": "50px", // default is 0, units: mm, cm, in, px
        //   "right": "50px",
        //   "bottom": "50px",
        //   "left": "50px",
        // },

        paginationOffset: 0, // Override the initial pagination number
        footer: {
          height: "0.5cm"
        }
        // "header": {
        //   "height": "45mm",
        //   "contents": '<div style="text-align: center;">Author: Marc Bachmann</div>'
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
      };
      pdf.create(html, config).toStream(function(err, stream) {
        res.setHeader(
          "Content-disposition",
          "attachment; filename=ficha_tecnica.pdf"
        );
        res.setHeader("Content-type", "application/pdf");
        stream.pipe(res);
      });
    })
  });
});

module.exports = Router;
