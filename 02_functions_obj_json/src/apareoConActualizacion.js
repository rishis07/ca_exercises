// importar lo que sea necesario
const util = require('util');
const file_utils = require('./src/fileUtils.js');

/**
 * Detecta cual de los objetos A, B es mayor, si una colección de claves es pasada itera
 * hasta encotrar el mayor o llegar al final de las claves
 * @param {Object[]} a objeto a comparar
 * @param {Object[]} b objeto a comparar
 * @param {string[]} claves las claves por las que quiero ordenar, por orden de importancia
 * TODO: Deberia hacer alguna lógica para que detecte el tipo de dato, probablemente no funcione
 * con dates
 */
function mayor_menor(a, b, claves) {
    clave = claves.pop()

    let comparison;
    if (a[clave] == b[clave] && claves.length > 0) {
        comparison = ordenar(a, b, claves);
    }
    if (a[clave] > b[clave]) {
        comparison = 1;
    } else { // I could set comparasion to -1 but I think this is more reader friendly
        comparison = -1;
    }
    return comparison;
};

/**
 * ordena (in place) una coleccion de datos segun las claves provistas.
 * @param {Object[]} coleccion el array que quiero ordenar
 * @param {string[]} claves las claves por las que quiero ordenar, por orden de importancia
 */
function ordenar(coleccion, claves) {
    coleccion.sort((a, b) => {
        return mayor_menor(a, b, claves.slice())
    });
    return coleccion
}

/**
 * recibe las rutas del archivo de deudas original, archivo de pagos, archivo de deudas con las actualizaciones, y archivo de log para registrar errores o advertencias.
 * @param {string} rutaDeudasOld
 * @param {string} rutaPagos
 * @param {string} rutaDeudasNew
 * @param {string} rutaLog
 */
function actualizarArchivosDeudas(rutaDeudasOld, rutaPagos, rutaDeudasNew, rutaLog) {
    let deudas = file_utils.jsonToList(rutaDeudasOld);
    let pagos = file_utils.jsonToList(rutaPagos);

    new_deudas = innerActualizarDeudas(deudas, pagos, logger)

    file_utils.escribirTextoEnArchivo(rutaDeudasNew, new_deudas, True)
}

/**
 * @callback loggerCallback
 * @param {string} msg message to display
 * @param {string} filePath write log to file. Null to skip
 */
exports.logguear = function (msg, filePath = null) {
    console.log(msg)
    if (filePath) {
        file_utils.escribirTextoEnArchivo(filePath, msg, True) // This should be changed to an append
    }
}

/**
 * Inner actualizar deudas, no se como se hará esto para que el mismo export haga todo
 * @param {Object[]} deudas las deudas originales
 * @param {Object[]} pagos los pagos a aplicar
 * @param {loggerCallback} logger funcion a la cual llamar en caso de necesitar loguear un evento
 * @returns {Object[]} las deudas actualizadas
 */
function innerActualizarDeudas(deudas, pagos, logger) {
    deudas_sorted = ordenar(deudas, ["dni"]);
    pagos_sorted = ordenar(pagos, ["dni"]);

    let deuda_id = 0;
    let pago_id = 0;
    let sum_pagos = 0;    // No estoy seguro de la performance de poner un let dentro de un bucle :think:
    let new_deudas = [];
    let deuda = null;
    let pago = pagos_sorted[pago_id];

    while (deuda_id <= (deudas_sorted.length - 1)) {
        deuda = deudas_sorted[deuda_id];
        sum_pagos = 0;

        while (pago["dni"] > deuda["dni"]) { //no existe deuda para este pago
            logger(armarMsgPagoSinDeudaAsociada(pago));
            deuda_id += 1;
            deuda = deudas_sorted[deuda_id];
        }

        while (deuda["dni"] == pago["dni"]) {
            if (deuda["apellido"] != pago["apellido"]) {
                logger(armarMsgPagoConDatosErroneos(deuda, pago));
            } else {
                sum_pagos += pago["pago"];
            }
            pago_id += 1;
            pago = pagos_sorted[pago_id];
        }
        obj_new_deuda = {
            "dni": deuda["dni"],
            "nombre": deuda["nombre"],
            "apellido": deuda["apellido"],
            "debe": parseFloat(deuda["debe"]) - sum_pagos
        }
        new_deudas.push();
        logger(`new record stored ${obj_new_deuda["dni"]}`);
        console.log(obj_new_deuda["debe"]);
        if (obj_new_deuda["debe"] < 0) {
            logger(armarMsgPagoDeMas(obj_new_deuda));
        }

        deuda_id += 1;
        deuda = deudas_sorted[deuda_id];

    }

    return new_deudas
}

/**
 * realiza el apareo con actualizacion entre deudas y pagos, y loguea algunos eventos relevantes.
 * @param {Object[]} deudas las deudas originales
 * @param {Object[]} pagos los pagos a aplicar
 * @param {loggerCallback} logger funcion a la cual llamar en caso de necesitar loguear un evento
 * @returns {Object[]} las deudas actualizadas
 */
exports.actualizarDeudas = function (deudas, pagos, logger) {
    return innerActualizarDeudas(deudas, pagos, logger)
}

/**
 * arma un mensaje informando los detalles de un pago que no corresponde a ninguna deuda
 * @param {Object} pago el pago sin deuda correspondiente
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoSinDeudaAsociada(pago) {
    const logMsg = `
el siguiente pago no corresponde a ninguna deuda:
${util.inspect(pago)}

=================================
`
    return logMsg
}

/**
 * arma un mensaje indicando el dni del sujeto que pagó de más, y cuanto dinero quedó a su favor
 * @param {Object} deuda la deuda con excedente de pago
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoDeMas(deuda) {
    const logMsg = `
dni: ${deuda.dni} posee $${Math.abs(deuda.debe)} a su favor

=================================
`
    return logMsg
}

/**
 * arma un mensaje mostrando la deuda, y el pago que no se pudo concretar, y notifica que el registro permanece sin cambios.
 * @param {Object} deuda
 * @param {Object} pago
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoConDatosErroneos(deuda, pago) {
    const logMsg = `
error al querer actualizar esta deuda:
${util.inspect(deuda)}
con este pago:
${util.inspect(pago)}

se mantiene el registro original sin cambios

=================================
`
    return logMsg
}

// no modificar la interfaz pública!
// export default {
//     actualizarArchivosDeudas
// }
