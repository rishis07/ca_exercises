let fs = require('fs');

/**
 * lee y devuelve el contenido de un archivo como texto en 'utf-8'
 * @param {string} ruta relativa al directorio del proyecto
 * @return {string[]} array de objetos leidos
 */
function getObjectsInDirectory(file_path) {
    let data = fs.readFileSync(file_path, 'utf8')
    return data
};

/**
 * Hace una copia sincronica de respado del path pasado y lo guarda en el mismo directorio
 * @param {string} data_path path relativo de los archivos a respaldar
 * @param {string} backup_path path relativo a donde respaldar los datos
 * Todo: It' would be funnier to reuse this function in order to copy other
 * folders inside the data path
 */
exports.backupSync = function (data_path, backup_path) {
    files = fs.readdirSync(data_path);

    let origin_path = ""
    let dest_path = ""
    files.forEach(obj => {
        try {
            origin_path = `${data_path}/${obj}`
            if (fs.lstatSync(origin_path).isFile() && obj[0] != ".") {
                dest_path = `${backup_path}/${obj}`
                console.log(`Doing backup of ${obj} file to ${backup_path}/`);
                fs.createReadStream(origin_path).pipe(fs.createWriteStream(dest_path));
            }
        } catch (error) {
            console.log("Something bad happened")
            console.log(error)
        }
    });
}

/**
 * Hace una copia sincronica de respado del path pasado y lo guarda en el mismo directorio
 * utilizando promises
 * @param {string} data_path path relativo de los archivos a respaldar
 * @param {string} backup_path path relativo a donde respaldar los datos
 * Todo: It' would be funnier to reuse this function in order to copy other
 * folders inside the data path
 */
exports.backupPromise = function (data_path, backup_path) {
    let origin_path = ""
    let dest_path = ""

    async function fun() {
        try {
            let files = await fs.readdirSync(data_path);
            console.log(files)
        } catch (err) {
            console.log("Something whent wrong")
            console.log(err)
        }
    }
}

/**
 * lee y devuelve el contenido de un directorio
 * @param {string} ruta relativa al directorio del proyecto
 * @return {string} el texto leído
 */
function leerArchivoComoString(file_path) {
    let data = fs.readFileSync(file_path, 'utf8')
    return data
};

exports.jsonToList = function (file_path) {
    let data = leerArchivoComoString(file_path)
    let obj = JSON.parse(data);
    return obj
};

exports.arrayToJson = function (arr_list) {
    let out = JSON.stringify(arr_list);
    return out
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

/**
 * Agrega el texto al archivo de la ruta provista.
 * @param {string} file_path relativa al directorio del proyecto
 * @param {string} text 
 * @param {string} createIfNotExists flag para crear el archivo si no existe 
 */
exports.appendTextoEnArchivo = function (file_path, text, createIfNotExists) {
    if (fs.existsSync(file_path) || createIfNotExists == true) {
        fs.appendFileSync(file_path, text);
    } else {
        console.log("File does not exist")
    }
}