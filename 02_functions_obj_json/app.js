const apareo_utils = require('./src/apareoConActualizacion');
const file_utils = require('./src/fileUtils.js');

// actualizarDeudas
// let deudas_file = './in/deudasOLD.json';
// let pagos_file = './in/pagos.json';

// let deudas = file_utils.jsonToList(deudas_file);
// let pagos = file_utils.jsonToList(pagos_file);

// let deudas_actualizadas = apareo_utils.actualizarDeudas(deudas, pagos, apareo_utils.logguear)


// ordenarPorClaves

// actualizarArchivosDeudas

rutaDeudasOld = 'in/deudasOLD.json'
rutaPagos = 'in/pagos.json'
rutaDeudasNew = 'out/deudas_new.json'
rutaLog = 'out/out.log'


apareo_utils.actualizarArchivosDeudas(rutaDeudasOld, rutaPagos, rutaDeudasNew, rutaLog)