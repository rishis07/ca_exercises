import { backupSync, backupAsync, backupPromise, backupAsyncAwait } from './src/fileUtils.js';

let data_path = './data';
let backup_path = './data/backup';

// 1. Desarrollar un programa que realice lo pedido, procesando los archivos en forma
// sincrónica.
// backupSync(data_path, backup_path)


// 2. Realizar el mismo programa, pero que funcione en forma asincrónica, utilizando
//callbacks
//backupAsync(data_path, backup_path)



// 3. Realizar el mismo programa, pero utilizando Promises, con la sintaxis then/catch, y
// backupPromise(data_path, backup_path)

//luego usando async/await.
//backupAsyncAwait(data_path, backup_path)

// 4. Para pensar y comentar:<br></br>
// NodeJs es horrible aguante python