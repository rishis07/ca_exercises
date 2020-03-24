/**
 * separa el string ante cada ocurrencia del separador, y agrega al array resultado siempre que pueda
 * transformar al fragmento de string en numero.
 * @param {string} str 
 * @param {string} separator
 * @returns {number[]} array de numeros
 */
exports.transformarStringEnArrayDeNumeros = function (str, separator) {
    //str.split para pasar de str a array
    //map para operar por cada elemento del array
    //isNaN comprueba que sea un string con ! los saco
    //filter saca los elementos que fueron ignorados por map
    let res = str.split(separator).map(function (x) {
        if (!isNaN(x)) {
            return parseInt(x, 10);
        }
    });
    return res.filter(e => e != undefined);
}

/**
 * concatena todos los numeros entre sí, intercalando un separador entre
 * número y número.
 * @param {number[]} arr 
 * @param {string} separator 
 * @returns {string} el nuevo string
 */
exports.transformarArrayDeNumerosAUnSoloString = function (arr, separator) {
    return arr.join(separator)
}

// exportar ambas funciones