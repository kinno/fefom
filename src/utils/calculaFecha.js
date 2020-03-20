var moment = require('moment');
var fechaActual = moment()

export function calculaFecha(fechaLimite, fechaInicio) {
    (fechaInicio) ? fechaActual = moment(fechaInicio) : fechaActual = moment()
    fechaLimite = moment(fechaLimite)
    var diasDiferencia = fechaLimite.diff(fechaActual,'days')
    if(diasDiferencia > 0){
        var diasLaborales = 0
        var i = 0
        while(diasDiferencia>0){
            var fechaAuxiliar = moment(fechaActual).add(i,'days')
            if (fechaAuxiliar.isoWeekday() > 0 && fechaAuxiliar.isoWeekday() < 6) {
                diasLaborales++
                diasDiferencia--
            }
            
            i++;
        }
        return diasLaborales + 1 
    }else{
        return 0
    }
    
}

export function calculaFechaRevision(fechaInicio,fechaLimite) {
    fechaLimite = moment(fechaLimite)
    var diasDiferencia = fechaLimite.diff(fechaActual,'days')
    var diasLaborales = 0
    var i = 0
     while(diasDiferencia>0){
         var fechaAuxiliar = moment(fechaActual).add(i,'days')
        if (fechaAuxiliar.isoWeekday() > 0 && fechaAuxiliar.isoWeekday() < 6) {
            diasLaborales++
            diasDiferencia--
        }
        
        i++;
     }
     return diasLaborales + 1 
}
