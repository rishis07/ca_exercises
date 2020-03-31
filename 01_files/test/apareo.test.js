const file_utils = require('./../src/utils/fileUtils');
const transform_utils = require('./../src/utils/transformUtils');
const apareo_utils = require('./../src/apareo');

// leo los 4 archivos a memoria
let in_files = [
    './../in/10NumerosOrdenadosEntre1y50(setA).in',
    './../in/imparesOrdenadosEntre1y999.in',
    './../in/10NumerosOrdenadosEntre1y50(setB).in',
    './../in/paresOrdenadosEntre2y1000.in']

let arrays = []
in_files.forEach(fileName => {
    arrays.push(file_utils.leerArchivoComoString(fileName));

});

// preparo los 4 arrays a partir de los archivo leidos
let arraysInt = []
let separator = ","
arrays.forEach(arr => {
    arraysInt.push(transform_utils.transformarStringEnArrayDeNumeros(arr, separator))
});

// combino los primeros dos arrays
let arr1 = arraysInt[0]
let arr2 = arraysInt[1]

let oneTwoArr = apareo_utils.combinarDosArrays(arr1, arr2, true)
console.log(oneTwoArr)

// combino los cuatro arrays
let res = apareo_utils.combinarNArrays(arraysInt)
console.log(res)
