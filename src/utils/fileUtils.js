let fs = require('fs');

/**
 * lee y devuelve el contenido de un archivo como texto en 'utf-8'
 * @param {string} ruta relativa al directorio del proyecto
 * @return {string} el texto leído
 */
exports.leerArchivoComoString = function (file_path) {
    let data = fs.readFileSync(file_path, 'utf8')
    return data
};

/**
 * escribe el texto en el archivo de la ruta, sólo si tal archivo existe.
 * sino, lanza error.
 * @param {string} file_path relativa al directorio del proyecto
 * @param {string} text 
 * @param {string} createIfNotExists flag para crear el archivo si no existe 
 */
exports.escribirTextoEnArchivo = function (file_path, text, createIfNotExists) {
    if (fs.existsSync(file_path) || createIfNotExists == true) {
        fs.writeFileSync(file_path, text);
        console.log('file written');
    } else {
        console.log("File does not exist")
    }
}
