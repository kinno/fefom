var NumeroALetras = require('./numeroLetras');
var moment = require('moment');
const path = require('path');
function formatoCartera(datos,municipio) {
    // console.log((datos))
    // console.log((municipio[0]))
    // var techos = JSON.parse(datos.techos);
    var techos = JSON.parse(datos.techos)
    var rubros = ``;
    var numRubro = 1;
    var numSub = 1;
    techos.forEach(element => {
        if (element.nombre !== 'Recursos no etiquetados') {
            rubros += `
                <tr>
                    <td class="tg-y6fn">${numRubro}</td>
                    <td class="tg-y6fn" colspan="5">${element.porc}% ${element.nombre}</td>
                    <td class="tg-7qzr">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(element.techo)}</td>
                </tr>`;
                    element.proyectos.forEach(proyecto => {
                        rubros += `
                                <tr>
                                    <td class="tg-0lax">${numRubro}.${numSub}</td>
                                    <td class="tg-0lax">${proyecto.nombre_proyecto}</td>
                                    <td class="tg-0lax" style="text-align: center !important;">${proyecto.localidad}</td>
                                    <td class="tg-0lax" style="text-align: center !important;">${proyecto.total_meta}</td>
                                    <td class="tg-0lax" style="text-align: center !important;">${proyecto.unidad_medida_meta}</td>
                                    <td class="tg-0lax">${proyecto.descripcion_proyecto}</td>
                                    <td class="tg-lqy6">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(proyecto.monto)}</td>
                                </tr>
                        `
                        numSub++;
                    });
        }else{
            rubros += `
            <tr>
                <td class="tg-rmli" colspan="6">Recursos no etiquetados 50%</td>
                <td class="tg-ehvm">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(element.techo)}</td>
            </tr>`;
                element.proyectos.forEach(proyecto => {
                    rubros += `
                            <tr>
                                <td class="tg-0lax">${numRubro}.${numSub}</td>
                                <td class="tg-0lax">${proyecto.nombre_proyecto}</td>
                                <td class="tg-0lax" style="text-align: center !important;">${proyecto.localidad}</td>
                                <td class="tg-0lax" style="text-align: center !important;">${proyecto.total_meta}</td>
                                <td class="tg-0lax" style="text-align: center !important;">${proyecto.unidad_medida_meta}</td>
                                <td class="tg-0lax">${proyecto.descripcion_proyecto}</td>
                                <td class="tg-lqy6">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(proyecto.monto)}</td>
                            </tr>
                    `
                    numSub++;
                });
        }
        numRubro++;
        numSub = 1;
    });
    
    var html = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;font-size:11px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-size:12px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-7v7y{padding:1px 5px;font-weight:bold; background-color:#656565;color:#ffffff;border-color:inherit;text-align:left;vertical-align:middle}
    .tg .tg-d41i{padding:1px 5px;background-color:#343434;color:#ffffff;border-color:inherit;text-align:center;vertical-align:middle}
    .tg .tg-rmli{padding:1px 5px;font-weight:bold; background-color:#21631f;color:#ffffff;border-color:inherit;text-align:left;vertical-align:top}
    .tg .tg-lqy6{text-align:right;vertical-align:top}
    .tg .tg-epna{background-color:#343434;color:#ffffff;border-color:inherit;text-align:center;vertical-align:top}
    .tg .tg-6goe{padding:1px 5px;font-weight:bold;background-color:#656565;color:#ffffff;border-color:inherit;text-align:right;vertical-align:top}
    .tg .tg-ehvm{padding:1px 5px;font-weight:bold;background-color:#21631f;color:#ffffff;border-color:inherit;text-align:right;vertical-align:top}
    .tg .tg-y6fn{padding:1px 5px;font-weight:bold; background-color:#c0c0c0;text-align:left;vertical-align:top}
    .tg .tg-7qzr{padding:1px 5px;font-weight:bold;background-color:#c0c0c0;text-align:right;vertical-align:top}
    .tg .tg-0lax{text-align:left;vertical-align:top; padding:5px !important;}
    p {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
      }
    </style>
    <table class="tg" style="width:100%">
      <tr>
        <th class="tg-d41i" rowspan="2">No. del Proyecto</th>
        <th class="tg-d41i" rowspan="2" style="width:20%">Denominación del Proyecto</th>
        <th class="tg-d41i" rowspan="2">Localidad (es)</th>
        <th class="tg-d41i" colspan="2">Metas</th>
        <th class="tg-d41i" rowspan="2">Breve descripción</th>
        <th class="tg-d41i" rowspan="2">Total de Recursos<br>(pesos)</th>
      </tr>
      <tr>
        <th class="tg-d41i">Total a realizar</th>
        <th class="tg-d41i">Unidad de medida</th>
      </tr>
      <tr>
        <th class="tg-7v7y" colspan="6">Total de Recursos Fefom 2020</td>
        <th class="tg-6goe">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(datos.techo_total)}</td>
      </tr>
      <tr>
        <th class="tg-rmli" colspan="6">Recursos etiquetados 50%</td>
        <th class="tg-ehvm">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(datos.techo_etiquetado)}</td>
      </tr>
      ${rubros}
    </table>
    `;
    var header = `<div style="margin-bottom: 10px;">
                        <table style="width: 100%; font-family:Arial, sans-serif;font-size:14px; font-weight: bold" border="0">
                            <tr>
                                <td style="text-align: center">
                                ANEXO<br>
                                "PROPUESTA DE OBRAS Y ACCIONES FEFOM ${datos.ejercicio}"<br>
                                DEL MUNICIPIO DE ${municipio[0].descripcion}
                                </td>
                            </tr>
                        </table>
                    </div>`;
    var footer = `<div id="pageFooter-last">
                    <table style="width: 100%; font-family:Arial, sans-serif;font-size:12px; font-weight: bold" border="0">
                        <tr>
                            <td style="text-align: center">
                                <div>ATENTAMENTE<br>
                                <br><br>
                                ${municipio[0].nombre}<br>
                                ${municipio[0].cargo} DE ${municipio[0].descripcion}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center; font-family:Arial, sans-serif;font-size:11px; font-weight: normal">
                                {{page}}
                            </td>
                        </tr>
                    </table>
                  </div>`;
  return header + html + footer
  }
  module.exports = formatoCartera;