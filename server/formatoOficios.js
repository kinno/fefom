var NumeroALetras = require('./numeroLetras');
var moment = require('moment');
const path = require('path');

function formatoTecho(datos) {
  var oficio = JSON.parse(datos.oficio);
  var techo = JSON.parse(datos.techo);
  //  console.log(NumeroALetras(techo.monto_total))

  //  TABLA CON COLUMNA RETENCIón
  //  <tr>
  //       <td class="tg-pykm" colspan="5" >Recursos etiquetados 50%</td>
  //       <td class="tg-6bfr" rowspan="2"><span style="font-weight:bold;">Recursos no etiquetados</span><br><span style="font-weight:bold">50%</span></td>
  //       <td class="tg-6bfr" rowspan="2"><span style="font-weight:bold;">Retención</span><br><span style="font-weight:bold">50%</span> Programa Especial FEFOM</td>
  //     </tr>
  //     <tr>
  //       <td class="tg-6qw1">Iluminación municipal<br>${techo.porc_iluminacion_municipal}%</td>
  //       <td class="tg-6qw1">Seguridad<br>${techo.porc_seguridad}%</td>
  //       <td class="tg-6qw1">Proyectos de inversión pública<br>${techo.porc_inversion_publica}%</td>
  //       <td class="tg-6qw1">Acciones para el desarrollo<br>${techo.porc_desarrollo}%</td>
  //       <td class="tg-6qw1">Protección Civil<br>${techo.porc_proteccion_civil}%</td>
  //     </tr>
  //     <tr>
  //       <td class="tg-0lax">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_iluminacion_municipal)}</td>
  //       <td class="tg-0lax">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_seguridad)}</td>
  //       <td class="tg-0lax">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_inversion_publica)}</td>
  //       <td class="tg-0lax">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_desarrollo)}</td>
  //       <td class="tg-0lax">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_proteccion_civil)}</td>
  //       <td class="tg-0lax">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_no_etiquetado)}</td>
  //       <td class="tg-0lax">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_retencion)}</td>

  //     </tr>
  var tablaTechos = `
  <style type="text/css">
    .tl  {border-collapse:collapse;border-spacing:0; margin-top: -30px !important; margin-bottom: -30px !important;}
    .tl td{font-family:Arial, sans-serif;font-size:14px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black; padding:5px !important;}
    .tl th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tl .tg-6bfr{background-color:#9b9b9b;color:#000000;text-align:center;vertical-align:bottom}
    .tl .tg-pykm{font-weight:bold;background-color:#9b9b9b;text-align:center;vertical-align:top}
    .tl .tg-6qw1{background-color:#c0c0c0;text-align:center;vertical-align:bottom}
    .tl .tg-0lax{text-align:left;vertical-align:top}
    .titulo{ font-size: 12px !important;}
    .subtitulo{ font-size: 11px !important;}
    .texto{ font-size: 10px !important;}
  </style>
  <table class="tl" style="undefined;table-layout: fixed; width:100%">
    <colgroup>
    <col style="width: 16%">
    <col style="width: 16%">
    <col style="width: 16%">
    <col style="width: 16%">
    <col style="width: 16%">
    <col style="width: 16%">
    </colgroup>
      <tr>
        <td class="tg-pykm titulo" colspan="5" >Recursos etiquetados 50%</td>
        <td class="tg-6bfr titulo" rowspan="2"><span style="font-weight:bold;">Recursos no etiquetados</span><br><span style="font-weight:bold">50%</span></td>
      </tr>
      <tr>
        <td class="tg-6qw1 subtitulo">Iluminación municipal<br>${techo.porc_iluminacion_municipal}%</td>
        <td class="tg-6qw1 subtitulo">Seguridad<br>${techo.porc_seguridad}%</td>
        <td class="tg-6qw1 subtitulo">Proyectos de inversión pública<br>${techo.porc_inversion_publica}%</td>
        <td class="tg-6qw1 subtitulo">Acciones para el desarrollo<br>${techo.porc_desarrollo}%</td>
        <td class="tg-6qw1 subtitulo">Protección Civil<br>${techo.porc_proteccion_civil}%</td>
      </tr>
      <tr>
        <td class="tg-0lax texto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_iluminacion_municipal)}</td>
        <td class="tg-0lax texto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_seguridad)}</td>
        <td class="tg-0lax texto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_inversion_publica)}</td>
        <td class="tg-0lax texto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_desarrollo)}</td>
        <td class="tg-0lax texto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_proteccion_civil)}</td>
        <td class="tg-0lax texto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(techo.monto_no_etiquetado)}</td>
      </tr>
  </table>
  `;

  oficio.texto = oficio.texto.replace('<<$montoGeneral>>', '<span style="font-weight:bold">' + new Intl.NumberFormat('es-419', {
    style: 'currency',
    currency: 'MXN'
  }).format(techo.monto_total) + '</span>')
  oficio.texto = oficio.texto.replace('<<$montoConLetra>>', NumeroALetras(techo.monto_total))
  oficio.texto = oficio.texto.replace('<<$tablaTechos>>', tablaTechos)
  // console.log(oficio)

  var html = `<style type="text/css">
  .tg  {border-collapse:collapse;border-spacing:0;}
  .tg td{font-family:Arial, sans-serif;font-size:14px;padding-top:5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;text-align:justify;}
  .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
  .tg .tg-zv4m{border-color:#ffffff;vertical-align:top;}
  .tg .tg-zv5m{border-color:#ffffff;vertical-align:top;font-size:8px;}
  .tg .tg-8jgo{border-color:#ffffff;text-align:center;vertical-align:top;font-weight: bold;}
  .tg .tg-ofj5{border-color:#ffffff;text-align:right;vertical-align:top; font-size:12px;}
  </style>
  <table class="tg" style="table-layout: fixed;" border="0">
    <tr>
      <td class="tg-ofj5">Toluca de Lerdo, México a:<br>${moment(oficio.fecha_oficio).format("DD ")} de ${moment(oficio.fecha_oficio).format("MMMM")} de ${moment(oficio.fecha_oficio).format("YYYY")}<br>Oficio No. ${oficio.clave_oficio}</td>
    </tr>
    <tr>
      <td class="tg-zv4m" style="white-space: pre-line; font-weight: bold;">${oficio.titulo}</td>
    </tr>
    <tr>
      <td class="tg-zv4m" style="white-space: pre-line;">${oficio.texto}</td>
    </tr>
    <tr>
      <td class="tg-8jgo" style="padding-top:25px !important;">ATENTAMENTE<br><br><br><hr width="300px">ROBERTO INDA GONZÁLES<br>SUBSECRETARIO</td>
    </tr>
    <tr>
      <td class="tg-zv5m" >c.c.p: ${(oficio.copias!== null) ? oficio.copias : ''}<br>         Archivo:${(oficio.tat!== null) ? oficio.tat : ''} <br>         ${(oficio.iniciales!== null) ? oficio.iniciales : ''}</td>
    </tr>
  </table>`;
  var ruta = path.join(__dirname,'../public/img');
      ruta = ruta.replace(/\\/g, "/");
  var header = `<div id="pageHeader">
                  <table style="width: 100%" border="0">
                    <tr>
                      <td width="25%"><img src="file:///${ruta}/logoHeaderIzquierda.png" style="width:80%" /></td>
                      <td width="50%"></td>
                      <td width="25%" style="text-align: right;"><img src="file:///${ruta}/logoHeaderDerecha.png" style="width:80%" /></td>
                    </tr>
                    <tr>
                    <td colspan="3" style="font-family:Arial, sans-serif;font-size:12px;text-align: center;  padding: 10px;">
                      ${oficio.leyenda}
                    </td>
                    </tr>
                  </table>
                  </div>`;
  var footer = `<div id="pageFooter">
                  <table style="width: 100%;" border="0">
                    <tr>
                      <td  style="font-family:Arial, sans-serif;font-size:12px;text-align: center;  padding: 0px;">
                        <img src="file:///${ruta}/logoFooter.png" style="width:100%" />
                      </td>
                    </tr>
                  </table>
                </div>`;
  // var header = `<div id="pageHeader" style="background-color: black;"><center><img src="file:///${ruta}" style="width:100%; height: auto" /></center><br></div>`;
  var formato = header + html + footer
  // var formato = html;
  return formato
}

function formatoCartera(datos) {
  var oficio = JSON.parse(datos.oficio);
//   var cartera = JSON.parse(datos.cartera);
 
var monto_total = 0;
  var proyectos = ""
  datos.cartera.forEach(element => {
      element = JSON.parse(element)
     
      proyectos = proyectos+`
        <tr>
            <td class="tg-0lax">${element.nombre_proyecto}</td>
            <td class="tg-lqy6">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(element.monto)}</td>
        </tr>
      `
      monto_total = +monto_total + +element.monto;
  });
  var tablaCartera = `
  <style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;padding: 5px !important;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black; padding: 5px !important;}
.tg .tg-mn8v{font-weight:bold;background-color:#9b9b9b;border-style:solid;border-width:1px;border-color:black;text-align:center;vertical-align:top}
.tg .tg-0x09{background-color:#9b9b9b;text-align:right;vertical-align:top}
.tg .tg-lqy6{text-align:right;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
<table class="tg" style="undefined;table-layout: fixed; width: 100%">
  <tr>
    <th class="tg-mn8v">Obras y/o Acciones</th>
    <th class="tg-0x09"><span style="font-weight:bold">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(monto_total)}</span></th>
  </tr>
  ${proyectos}
</table>
  `;

  oficio.texto = oficio.texto.replace('<<$tablaCartera>>', tablaCartera)
  // console.log(oficio)

  var html = `<style type="text/css">
  .tg  {border-collapse:collapse;border-spacing:0;}
  .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;text-align:justify;}
  .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
  .tg .tg-zv4m{border-color:#ffffff;vertical-align:top;}
  .tg .tg-zv5m{border-color:#ffffff;vertical-align:top;font-size:8px;}
  .tg .tg-8jgo{border-color:#ffffff;text-align:center;vertical-align:top;font-weight: bold;}
  .tg .tg-ofj5{border-color:#ffffff;text-align:right;vertical-align:top; font-size:12px;}
  </style>
  <table class="tg" style="undefined;table-layout: fixed;">
    <tr>
      <td class="tg-ofj5">Toluca de Lerdo, México a:<br>${moment(oficio.fecha_oficio).format("DD ")} de ${moment(oficio.fecha_oficio).format("MMMM")} de ${moment(oficio.fecha_oficio).format("YYYY")}<br>Oficio No. ${oficio.clave_oficio}</td>
    </tr>
    <tr>
      <td class="tg-zv4m" style="white-space: pre-line; font-weight: bold;">${oficio.titulo}</td>
    </tr>
    <tr>
      <td class="tg-zv4m" style="white-space: pre-line;">${oficio.texto}</td>
    </tr>
    <tr>
      <td class="tg-8jgo">ATENTAMENTE<br><br><br><hr width="300px">ROBERTO INDA GONZÁLES<br>SUBSECRETARIO</td>
    </tr>
    <tr>
      <td class="tg-zv5m" style="white-space: pre-line;">c.c.p: ${oficio.copias}<br>         Archivo:${oficio.tat} <br>         ${oficio.iniciales}</td>
    </tr>
  </table>`;
  return html
}

function formatoOficio(datos) {
  var oficio = JSON.parse(datos.oficio)
  switch (oficio.id_tipo_oficio) {
    case 1:
      return formatoTecho(datos)
      break;
    case 2:
      return formatoCartera(datos)
      break;

    default:
      break;
  }
}
module.exports = formatoOficio;
