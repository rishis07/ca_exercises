const file_utils = require('./src/utils/fileUtils');
const transform_utils = require('./src/utils/transformUtils');
const transform_utils = require('./src/transformUtils');

let out_file = './out/write_file.out'

// escribirTextoEnArchivo

// let in_msg = "Hello Friend"
// file_utils.escribirTextoEnArchivo(out_file, in_msg, true);

// leerArchivoComoString

// let msg = file_utils.leerArchivoComoString(out_file);
// console.log(msg)

// transformarStringEnArrayDeNumeros

// let text = '123 | 456 | 789 | 1bc | 10'
// let separator = '|'

// res = transform_utils.transformarStringEnArrayDeNumeros(text, separator)
// console.log(text)
// console.log(res)

//transformarArrayDeNumerosAUnSoloString

// arr = [123, 456, 789, 10]
// separator = ','
// res = transform_utils.transformarArrayDeNumerosAUnSoloString(arr, separator)
// console.log(res)


// combinarDosArrays

let arr1 = [1, 5, 10]
let array2 = [2, 3, 8, 11]

let res = transform_utils(ar1, arr2)
console.out(res)

// Output: [1, 2, 3, 5, 8, 10, 11]