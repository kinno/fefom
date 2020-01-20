var NumeroALetras = require('./numeroLetras');
var moment = require('moment');
const path = require('path');
function formatoFicha(datos) {
    console.log(datos)
    var fuentes_json = JSON.parse(datos[0].fuentes_financiamiento);
    var calendario_json = JSON.parse(datos[0].calendario_inversion);
    var alineacion_estrategica_json = JSON.parse(datos[0].alineacion_estrategica);
    var imagenes_json = JSON.parse(datos[0].imagenes);
    var variables_relevantes_json = JSON.parse(datos[0].variables_relevantes);
    var alternativas_costos_json = JSON.parse(datos[0].alternativas_costos);
    var componentes_json = JSON.parse(datos[0].componentes);
    var costos_json = JSON.parse(datos[0].costos);
    var beneficios_json = JSON.parse(datos[0].beneficios);

    var ruta = path.join(__dirname,'../public/uploads/');
      ruta = ruta.replace(/\\/g, "/");

    var monto_inversion = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial; font-size: 12px !important; sans-serif;padding:0px 0px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial; font-size: 14px !important; sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-f2tu{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:middle}
    .titulo{ font-size: 14px !important}
    .texto{ font-size: 11px !important}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-f2tu" colspan="2">Monto total de inversión</th>
      </tr>
      <tr>
        <td class="tg-cly1 ">Monto de inversión:<br>(con IVA, para registro)</td>
        <td class="tg-cly1  monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(datos[0].monto_con_iva)}</td>
      </tr>
      <tr>
        <td class="tg-cly1">Monto de inversión:<br>(sin IVA, para registro)</td>
        <td class="tg-cly1 monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(datos[0].monto_sin_iva)}</td>
      </tr>
      <tr>
        <td class="tg-cly1">Monto para estudios:<br>(en caso que aplique)</td>
        <td class="tg-cly1 monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(datos[0].monto_estudios)}</td>
      </tr>
    </table>
    `;

    var row_fuentes = "";
    fuentes_json.forEach(fuente => {
        row_fuentes += 
        `<tr>
            <td class="tg-cly1">${fuente.fuente}</td>
            <td class="tg-cly1">${fuente.porcentaje}</td>
            <td class="tg-0lax monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(fuente.monto)}</td>
        </tr>`
    });

    var fuentes = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-7fle{font-weight:bold;background-color:#efefef;text-align:center;vertical-align:top}
    .tg .tg-ncfi{font-weight:bold;background-color:#efefef;text-align:center;vertical-align:middle}
    .tg .tg-f2tu{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:middle}
    .tg .tg-0lax{text-align:left;vertical-align:top}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-f2tu" colspan="3">Fuentes de financiamiento</th>
      </tr>
      <tr>
        <td class="tg-ncfi">Origen</td>
        <td class="tg-ncfi">%</td>
        <td class="tg-7fle">Monto<br>(incluye IVA)</td>
      </tr>
      ${row_fuentes}
    </table>
    `;

    var horizonte_evaluacion = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-f2tu{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:middle}
    .tg .tg-0lax{text-align:center;vertical-align:top}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-f2tu" colspan="2">Horizonte de evaluación</th>
      </tr>
      <tr>
        <td class="tg-cly1">Fecha de inicio de Ejecución:</td>
        <td class="tg-cly1">${moment(datos[0].fecha_inicio_ejecucion).format("MMMM YYYY").toUpperCase()}</td>
      </tr>
      <tr>
        <td class="tg-cly1">Fecha de Término de Ejecución:</td>
        <td class="tg-cly1">${moment(datos[0].fecha_inicio_ejecucion).add(datos[0].meses_ejecucion, "M").format("MMMM YYYY").toUpperCase()}</td>
      </tr>
      <tr>
        <td class="tg-0lax">Número de Años de Operación:</td>
        <td class="tg-0lax">${datos[0].anios_ejecucion}</td>
      </tr>
    </table>
    `;

    var row_calendario = "";
    var total_calendario = 0;
    calendario_json.forEach(calendario => {
        row_calendario += 
        `<tr>
            <td class="tg-0lax">${calendario.anio}</td>
            <td class="tg-0lax monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(calendario.monto)}</td>
        </tr>`
        total_calendario += calendario.monto;
    });
    row_calendario += `<tr><td class="tg-f2tub">Total</td><td class="tg-f2tuc">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(total_calendario)}</td></tr>`
    
    var calendario = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-f2tu{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:middle}
    .tg .tg-f2tub{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:middle}
    .tg .tg-f2tuc{font-weight:bold;background-color:#efefef;color:#000000;text-align:right;vertical-align:middle}
    .tg .tg-0lax{text-align:center;vertical-align:top}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-f2tu" colspan="2">Calendario de inversión</th>
      </tr>
      <tr>
        <td class="tg-f2tu">Año</td>
        <td class="tg-f2tu">Monto<br>(incluye IVA)</td>
      </tr>
      ${row_calendario}
    </table>
    `;

    var localizacion = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1N{text-align:left;}
    .tg .tg-n5sa{font-weight:bold;background-color:#c0c0c0;color:#ffffff;text-align:center;vertical-align:middle}
    .tg .tg-0laxN{text-align:left;}
    </style>
    <table class="tg">
    <tr>
        <th class="tg-n5sa" colspan="2">Localización Geográfica</th>
    </tr>
    <tr>
        <td class="tg-cly1N" style="width: 50%" valign="top">
            ${datos[0].localizacion_geografica}
        </td>
        <td class="tg-0laxN" style="width: 50%" valign="top"> 
            <center><img src="file:///${ruta}imgfichas/${datos[0].ruta_imagen_localizacion}" style="width:300px " /></center>
        </td>
    </tr>
    </table>
    `

    var seccion1 = `
    <style type="text/css">
      div {
        font-family:Arial, sans-serif;
      }
      .monto{
        text-align: right !important;
      }
    </style>
    <div style="page-break-after:always;">
        <p style="background-color: black; color: white;" align="center"><b>I. Información general del PPI</b></p>
        <table style="width: 100%">
        <tr>
        <td style="vertical-align:top" colspan="2">
        <table style="width:100%">
        <tr>
        <td colspan="2" style="text-align: right">
          <span style="font-size: 12px;">Ficha Técnica No:</span> <span>${datos[0].id_ficha_tecnica}</span><br>
          <span style="font-size: 12px;">Versión:</span> <span>${datos[0].version}</span>
        </td>
        </tr>
        <tr>
        <td style="width:25%; font-size: 12px">Nombre del PPI: </td><td style="width:75%; background-color:#efefef; font-size: 14px"><span><b>${datos[0].nombre_proyecto.toUpperCase()}</b></span></td>
        </tr>
        <tr>
        <td style="font-size: 12px"> Unidad Responsable: </td><td style="font-size: 14px"><span><b>${datos[0].descripcion}</b></span></td>
        </tr>
        <tr>
        <td style="font-size: 12px">Tipo de PPI: </td><td style="font-size: 14px"><span><b>${datos[0].tipo}</b></span></td>
        </tr>
        <tr>
        <td style="font-size: 12px">Subclasificación de PPI: </td><td style="background-color:#efefef; font-size: 14px"><span><b>${datos[0].subclasificacion_ppi}</b></span></td>
        </tr>
        </table>
        
        </td>
        </tr>
        <tr>
        <td style="vertical-align:top">
        ${monto_inversion}
        </td>
        <td style="vertical-align:top">
            ${fuentes}
        </td>
        <tr>
        <td style="vertical-align:top">
        ${horizonte_evaluacion}
        </td>
        <td style="vertical-align:top">
            ${calendario}
        </td>
        </tr>
        <tr>
        <td style="vertical-align:top" colspan="2">
        ${localizacion}
        </td>
        </tr>
        </table>
    </div>
    `;
    
    var row_alineacion = '';
    alineacion_estrategica_json.forEach(data => {
      row_alineacion += `
      <tr>
        <td class="tg-cly1">${data.programa}</td>
        <td class="tg-cly1">${data.objetivoEstrategia}</td>
        <td class="tg-cly1">${data.lineaAccion}</td>
      </tr>
      `
    });

    var programas_objetivos_accion = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;width:100%;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-wa1i{font-weight:bold;background-color:#efefef;text-align:center;vertical-align:top;}
    
    .tg .tg-0lax{text-align:left;vertical-align:top}
    </style>
    <table class="tg" style="undefined;table-layout: fixed;">
      <tr>
        <th class="tg-wa1i">Programa(s) Relacionado(s)</td>
        <th class="tg-wa1i">Objetivo(s) / Estrategia(s)</td>
        <th class="tg-wa1i">Líneas de Acción</td>
      </tr>
      ${row_alineacion}
    </table>
    `;

    var programas_complementarios = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-wa1i{font-weight:bold;background-color:#c0c0c0;color:#ffffff;text-align:center;vertical-align:middle;}
    .tg .tg-wa1i2{font-weight:bold;background-color:#efefef;text-align:center;vertical-align:top;}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-wa1i" colspan="2">Programas o proyectos complementarios o relacionados</th>
      </tr>
      <tr>
        <td class="tg-wa1i2">Proyecto</td>
        <td class="tg-wa1i2">Relación</td>
      </tr>
      <tr>
        <td class="tg-cly1">${datos[0].proyecto_complementario}</td>
        <td class="tg-cly1">${datos[0].relacion_complementaria}</td>
      </tr>
    </table>
    `;

    var seccion2 = `
        <div style=" page-break-after:always;">
        <p style="background-color: black; color: white;" align="center"><b>II. Alineación Estratégica</b></p>
            ${programas_objetivos_accion}
            <br>
            ${programas_complementarios}
        </div>
    `;
    
    var row_images = ''
    var i = 1;
    row_images += `<tr>`
    for (let index = 0; index < imagenes_json.length; index++) {
      row_images += 
      `<td style="vertical-align:top">
        <center><img src="file:///${ruta}imgfichas/${imagenes_json[index].url}" style="width: 300px"/></center>
        <div >
        ${imagenes_json[index].descripcion}
        </div>
       </td>`
      if(index % 2){
        if((index+1) == imagenes_json.length){
          row_images += "</tr>"
        }else{
          row_images += "</tr></tr>"
        }
      }
    }

    var row_variables_relevantes = ''
      variables_relevantes_json.forEach(element => {
        row_variables_relevantes += `
          <tr>
              <td class="tg-0lax">${element.concepto}</td>
              <td class="tg-0lax">${element.situacionActual}</td>
          </tr>
        `
    });

    var analisis_situacion = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0; width:100%;}
    .tg td{font-family:Arial, sans-serif;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:top}
    .tg .tg-7fle{font-weight:bold;background-color:#efefef;text-align:center;vertical-align:top}
    .tg .tg-9etm{font-weight:bold;background-color:#9b9b9b;color:#ffffff;text-align:center;vertical-align:middle}
    .tg .tg-tc7w{font-weight:bold;background-color:#9b9b9b;color:#ffffff;text-align:left;vertical-align:top}
    .tg .tg-0lax{text-align:left;vertical-align:top}
    .tg .tg-i1re{font-weight:bold;background-color:#9b9b9b;color:#ffffff;text-align:center;vertical-align:top}
    </style>
    <table class="tg" style="undefined;table-layout: fixed;">
    <colgroup>
    <col style="width: 238px">
    <col style="width: 238px">
    </colgroup>
    <tr>
        <th class="tg-9etm" colspan="2">Descripción de la problemática</th>
    </tr>
    <tr>
        <td class="tg-cly1" colspan="2">${datos[0].descripcion_problematica}</td>
    </tr>
    ${row_images}
    <tr>
        <td class="tg-tc7w">Análisis de la oferta</td>
        <td class="tg-tc7w">Análisis de la demanda</td>
    </tr>
    <tr>
        <td class="tg-0lax">${datos[0].analisis_oferta}</td>
        <td class="tg-0lax">${datos[0].analisis_demanda}</td>
    </tr>
    <tr>
        <td class="tg-i1re" colspan="2">Variables Relevantes</td>
    </tr>
    <tr>
        <td class="tg-7fle">Concepto</td>
        <td class="tg-7fle">Situación Actual</td>
    </tr>
    ${row_variables_relevantes}
    </table>
    `;

    var seccion3 = `
        <div style=" page-break-after:always;">
        <p style="background-color: black; color: white;" align="center"><b>III. Alineación de la Situación Actual</b></p>
            ${analisis_situacion}
        </div>
    `;

    

    var medidas_optimizacion = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-ncfi{font-weight:bold;background-color:#efefef;text-align:center;vertical-align:middle}
    .tg .tg-rxz9{background-color:#c0c0c0;color:#ffffff;text-align:center;vertical-align:middle}
    .tg .tg-n5sa{font-weight:bold;background-color:#c0c0c0;color:#ffffff;text-align:center;vertical-align:middle}
    .tg .tg-y0n7{background-color:#efefef;text-align:center;vertical-align:middle}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-n5sa" colspan="2">Posibles medidas de optimización</th>
      </tr>
      <tr>
        <td class="tg-y0n7" style="width:50%"><span style="font-weight:bold">Medida</span></td>
        <td class="tg-ncfi" style="width:50%">Descripción</td>
      </tr>
      <tr>
        <td class="tg-cly1">${datos[0].medida_optimizacion}</td>
        <td class="tg-cly1">${datos[0].descripcion_optimizacion}</td>
      </tr>
      <tr>
        <td class="tg-n5sa">Análisis de la oferta sin proyecto<br>(considerando medidas de optimización)</td>
        <td class="tg-rxz9"><span style="font-weight:700">Análisis de la demanda sin proyecto</span><br><span style="font-weight:700">(considerando medidas de optimización)</span></td>
      </tr>
      <tr>
        <td class="tg-cly1">${datos[0].analisis_oferta_sin_proyecto}</td>
        <td class="tg-cly1">${datos[0].analisis_demanda_sin_proyecto}</td>
      </tr>
    </table>
    `;

    var row_alternativas_costos = "";
    alternativas_costos_json.forEach(el => {
      row_alternativas_costos += `
        <tr>
          <td class="tg-lboi">${el.descripcion}</td>
          <td class="tg-lboi monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(el.costoMantenimiento)}</td>
          <td class="tg-lboi monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(el.costoOperacion)}</td>
          <td class="tg-lboi monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(el.costoTotal)}</td>
        </tr>
      `
    });

    var alternativas = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-lboi{border-color:inherit;text-align:left;vertical-align:middle}
    .tg .tg-8f5t{font-weight:bold;background-color:#c0c0c0;color:#ffffff;border-color:inherit;text-align:center;vertical-align:middle}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-8f5t" style="width: 50%">Descripción de las alternativas de solución desechadas</th>
        <th class="tg-8f5t" style="width: 16%">Costo Mantenimiento<br>(Incluye Iva)</th>
        <th class="tg-8f5t" style="width: 16%">Costo Operación<br>(Incluye Iva)</th>
        <th class="tg-8f5t" style="width: 17%">Costo Total<br>(Incluye Iva)</th>
      </tr>
      ${row_alternativas_costos}
      <tr>
        <td class="tg-8f5t" colspan="4">Justificación de la alternativa de solución seleccionada</td>
      </tr>
      <tr>
        <td class="tg-lboi" colspan="4">${datos[0].justificacion}</td>
      </tr>
    </table>
    `;

    var seccion45 = `
        <div style=" page-break-after:always;">
        <p style="background-color: black; color: white;" align="center"><b>IV. Alineación de la Situación Sin Proyecto</b></p>
            ${medidas_optimizacion}
            <p style="background-color: black; color: white;" align="center"><b>V. Alternativas de Solución</b></p>
            ${alternativas}
        </div>
    `;
   
    var descripcion_general = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-n5sa{font-weight:bold;background-color:#c0c0c0;color:#ffffff;text-align:center;vertical-align:middle}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-n5sa">Descripción General</th>
      </tr>
      <tr>
        <td class="tg-cly1">${datos[0].descripcion_general}</td>
      </tr>
    </table>
    `;

    var row_componentes = "";
    var total = 0;
    componentes_json.forEach(comp => {
      row_componentes += `
        <tr>
          <td class="tg-0lax">${comp.componente}</td>
          <td class="tg-0lax">${comp.descripcion}</td>
          <td class="tg-0lax monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(comp.costoUnitario)}</td>
          <td class="tg-0lax">${comp.cantidad}</td>
          <td class="tg-0lax">${comp.unidadMedida}</td>
          <td class="tg-0lax monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(comp.montoTotal)}</td>
        </tr>
      `
      total += comp.montoTotal
    });

    var componentes = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-v0zy{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:top}
    .tg .tg-f2tu{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:middle}
    .tg .tg-n5sa{font-weight:bold;background-color:#c0c0c0;color:#ffffff;text-align:center;vertical-align:middle}
    .tg .tg-0lax{text-align:left;vertical-align:top}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-n5sa" colspan="6">Descripción de los componentes del proyecto</th>
      </tr>
      <tr>
        <td class="tg-f2tu" style="width: 15%">Componente</td>
        <td class="tg-v0zy" style="width: 30%">Descripción</td>
        <td class="tg-v0zy">Costo Unitario</td>
        <td class="tg-v0zy">Cantidad</td>
        <td class="tg-v0zy" style="width: 15%">Unidad de<br>Medida</td>
        <td class="tg-v0zy" style="width: 20%">Monto Total<br>(incluye IVA)</td>
      </tr>
      ${row_componentes}
      <tr>
        <td colspan="5">Total:</td>
        <td colspan="5" class="monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(total)}</td>
      </tr>
    </table>
    `;

    var aspectos = `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-lboi{border-color:inherit;text-align:left;vertical-align:middle}
    .tg .tg-8f5t{font-weight:bold;background-color:#c0c0c0;color:#ffffff;border-color:inherit;text-align:center;vertical-align:middle}
    .tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
    .tg .tg-86td{font-weight:bold;background-color:#c0c0c0;color:#ffffff;border-color:inherit;text-align:center;vertical-align:top}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-8f5t">Aspectos ambientales más relevantes</th>
        <th class="tg-8f5t">Plano de la localización del proyecto</th>
      </tr>
      <tr>
        <td class="tg-lboi">${datos[0].aspecto_ambiental}</td>
        <td class="tg-lboi" rowspan="5">
          <img src="file:///${ruta}imgfichas/${datos[0].ruta_imagen_proyecto}" style="width:400px" />
        </td>
      </tr>
      <tr>
        <td class="tg-8f5t">Aspectos técnicos más relevantes</td>
      </tr>
      <tr>
        <td class="tg-0pky">${datos[0].aspecto_tecnico}</td>
      </tr>
      <tr>
        <td class="tg-86td">Aspectos legales más relevantes</td>
      </tr>
      <tr>
        <td class="tg-0pky">${datos[0].aspecto_legal}</td>
      </tr>
      <tr>
        <td class="tg-86td">Análisis de la oferta con proyecto</td>
        <td class="tg-86td">Análisis de la demanda con proyecto</td>
      </tr>
      <tr>
        <td class="tg-0pky">${datos[0].analisis_oferta_proyecto}</td>
        <td class="tg-0pky">${datos[0].analisis_demanda_proyecto}</td>
      </tr>
      <tr>
        <td class="tg-86td" colspan="2">Diagnóstico de la situación con proyecto</td>
      </tr>
      <tr>
        <td class="tg-0pky" colspan="2">${datos[0].diagnostico}</td>
      </tr>
    </table>
    `;

    var seccion6 = `
        <div style=" page-break-after:always;">
        <p style="background-color: black; color: white;" align="center"><b>VI. Análisis de la Situación con Proyecto</b></p>
            ${descripcion_general}
            <br>
            ${componentes}
        </div>
    `;

    var seccion6_2 = `
        <div style=" page-break-after:always;">
            ${aspectos}
        </div>
    `;

    var row_costos = "";
    costos_json.forEach(costo => {
      row_costos += `
        <tr>
          <td class="tg-cly1">${costo.tipoCosto}</td>
          <td class="tg-cly1">${costo.descripcion}</td>
          <td class="tg-0lax">${costo.cuantificacion}</td>
          <td class="tg-0lax monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(costo.valoracion)}</td>
          <td class="tg-0lax">${costo.periodicidad}</td>
      </tr>
      `
    });

    var row_beneficios = "";
    beneficios_json.forEach(beneficio => {
        row_beneficios += `
          <tr>
              <td class="tg-cly1">${beneficio.beneficio}</td>
              <td class="tg-cly1">${beneficio.descripcion}</td>
              <td class="tg-0lax">${beneficio.cuantificacion}</td>
              <td class="tg-0lax monto">${new Intl.NumberFormat('es-419', { style: 'currency', currency: 'MXN' }).format(beneficio.valoracion)}</td>
              <td class="tg-0lax">${beneficio.periodicidad}</td>
          </tr>
        `
    });

    var cuantificacion= `
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-v0zy{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:top}
    .tg .tg-f2tu{font-weight:bold;background-color:#efefef;color:#000000;text-align:center;vertical-align:middle}
    .tg .tg-n5sa{font-weight:bold;background-color:#c0c0c0;color:#ffffff;text-align:center;vertical-align:middle}
    .tg .tg-0lax{text-align:left;vertical-align:top}
    </style>
    <table class="tg">
    <tr>
        <th class="tg-n5sa" colspan="5">Identificación de costos</th>
    </tr>
    <tr>
        <td class="tg-f2tu">Tipo de Costo</td>
        <td class="tg-f2tu">Descripción</td>
        <td class="tg-v0zy">Cuantificación</td>
        <td class="tg-v0zy">Valoración</td>
        <td class="tg-v0zy">Periodicidad</td>
    </tr>
    ${row_costos}
    <tr>
        <td class="tg-n5sa" colspan="5">Identificación de Beneficios</td>
    </tr>
    <tr>
        <td class="tg-f2tu">Beneficio</td>
        <td class="tg-f2tu">Descripción</td>
        <td class="tg-v0zy">Cuantificación</td>
        <td class="tg-v0zy">Valoración</td>
        <td class="tg-v0zy">Periodicidad</td>
    </tr>
    ${row_beneficios}
    </table>
    `;

    var seccion7 = `
        <div style=" page-break-after:always;">
        <p style="background-color: black; color: white;" align="center"><b>VII. Identificación y cuantificación de costos y benificios</b></p>
            ${cuantificacion}
        </div>
    `;

    var html = seccion1+seccion2+seccion3+seccion45+seccion6+seccion6_2+seccion7;
  return html
  }
  module.exports = formatoFicha;