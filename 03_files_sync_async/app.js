const file_utils = require('./src/fileUtils.js');

data_path = './data'
backup_path = './data/backup'

// 1. Desarrollar un programa que realice lo pedido, procesando los archivos en forma
// sincrónica.
// file_utils.backupSync(data_path, backup_path)


// 2. Realizar el mismo programa, pero que funcione en forma asincrónica, utilizando
//callbacks
file_utils.backupAsync(data_path, backup_path)
console.log("Done")


// 3. Realizar el mismo programa, pero utilizando Promises, con la sintaxis then/catch, y
//luego usando async/await.


// 4. Para pensar y comentar:<br></br>