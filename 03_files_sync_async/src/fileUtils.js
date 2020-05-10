import fs from 'fs'


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
function backupSync(data_path, backup_path) {
    let files = fs.readdirSync(data_path);

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

function backupAsync(data_path, backup_path) {
    let origin_path = ""
    let dest_path = ""

    fs.readdir(data_path, function (err, items) {
        items.forEach(obj => {
            origin_path = `${data_path}/${obj}`
            fs.stat(origin_path, (err, stat) => {
                if (stat.isFile() && obj[0] != ".") {
                    console.log(`${obj} is ${stat.isFile()}`)
                    origin_path = `${data_path}/${obj}`
                    dest_path = `${backup_path}/${obj}`
                    fs.copyFile(origin_path, dest_path, (err) => {
                        if (err) throw err;
                        console.log(`${obj} Done`);
                    });
                }
            })
        });
    });
}


/**
 * Hace una copia asincronica de respado del path pasado y lo guarda en el mismo directorio
 * utilizando promises
 * @param {string} data_path path relativo de los archivos a respaldar
 * @param {string} backup_path path relativo a donde respaldar los datos
 * Todo: It' would be funnier to reuse this function in order to copy other
 * folders inside the data path
 */
function backupPromise(data_path, backup_path) {
    let origin_path = ""
    let dest_path = ""

    //Read objects in folder
    fs.promises.readdir(data_path)
        .then((names) => generateOriginDest(names, data_path, backup_path)) // Create an array of origin paths
        .then(avoidProcessingEmptyList) // Throw error if no files where added to the array
        .then(backupTargets) // Make the backup

        // If something goes wrong
        .catch(err => {
            console.log(err)
        })
}

/**
 * Hace una copia sincronica de respado del path pasado y lo guarda en el mismo directorio
 * utilizando promises
 * @param {string} data_path path relativo de los archivos a respaldar
 * @param {string} backup_path path relativo a donde respaldar los datos
 * Todo: It' would be funnier to reuse this function in order to copy other
 * folders inside the data path
 */
async function backupAsyncAwait(data_path, backup_path) {
    try {
        const names = await fs.promises.readdir(data_path)
        const targets = generateOriginDest(names, data_path, backup_path)
        avoidProcessingEmptyList(targets)
        backupTargets(targets)
    } catch (err) {
        showError(err)
    }
}

/**
 * Genera un diccionario origen destino de paths origen dest descartando todo lo que
 * no sea un archivo, tambien ignora archivos ocultos
 * @param {string} name Lista de nombres de objetos dentro de un directorio
 * @param {string} data_path path relativo de los archivos a respaldar
 * @param {string} backup_path path relativo a donde respaldar los datos
 * @return {list} lista de diccionarios con formato [{'origin':string, 'dest':string}]
 */
function generateOriginDest(names, data_path, backup_path) {
    let origin_path = ""
    let dest_path = ""
    const targets = []

    names.forEach(obj => {
        origin_path = `${data_path}/${obj}`
        if (fs.lstatSync(origin_path).isFile() && obj[0] != ".") {
            dest_path = `${backup_path}/${obj}`
            console.log(`adding ${origin_path} file for backup`);
            targets.push({ 'origin': dest_path, 'dest': dest_path })
        }
    })
    return targets
}


function backupTargets(targets) {
    targets.forEach(path => {
        console.log(`Backing up ${path['origin']} to ${path['dest']}`);
        fs.createReadStream(path['origin']).pipe(fs.createWriteStream(path['dest']));
    })
}

function avoidProcessingEmptyList(targets) {
    if (!targets.length) {
        throw new Error('no files to backup')
    }
    return targets
}

function showError(err) {
    console.log(err)
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

function jsonToList(file_path) {
    let data = leerArchivoComoString(file_path)
    let obj = JSON.parse(data);
    return obj
};

function arrayToJson(arr_list) {
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
function escribirTextoEnArchivo(file_path, text, createIfNotExists) {
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
function appendTextoEnArchivo(file_path, text, createIfNotExists) {
    if (fs.existsSync(file_path) || createIfNotExists == true) {
        fs.appendFileSync(file_path, text);
    } else {
        console.log("File does not exist")
    }
}

export {
    backupSync,
    backupAsync,
    backupPromise,
    backupAsyncAwait
}