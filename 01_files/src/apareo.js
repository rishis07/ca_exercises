/**
 * toma dos arrays de números ordenados y en forma eficiente los combina en uno solo, aún ordenado
 * @param {number[]} arrA un array de números ordenados
 * @param {number[]} arrB otro array de números ordenados
 * @returns {number[]} un nuevo array de números ordenados
 */

exports.combinarDosArrays = function (arrA, arrB, sorted) {
    return mergeArrays(arrA, arrB, sorted)
}

function mergeArrays(arrA, arrB, sorted) {

    res = [];
    leftOver = [];
    if (arrA.length > arrB.length) {
        bigger = arrA;
        lower = arrB;
        // get the elements bigger than lower array
        leftOver = bigger.slice(lower.length);
    } else if (arrA.length < arrB.length) {
        bigger = arrB;
        lower = arrA;
        // get the elements bigger than lower array
        leftOver = bigger.slice(lower.length);
    }

    for (let i = 0; i < lower.length; i++) {
        res.push(lower[i]);
        res.push(bigger[i]);
    }
    res = [].concat(res, leftOver) //this concat is a little wierd
    // Note: In the first problem there is the cuestion of
    // not using sort and find another way. This can be achived
    // by putting an if on the push secction but it will only work
    // with intercalated arrays. For example [1,10], [2,5,7]
    // will break. I'm choosing this method so I can reuse this
    // for N arrays applying some good old recursion
    if (sorted) { return res.sort((a, b) => a - b); }
    return res


}

/**
 * toma un array de muchos arrays de números ordenados y los combina en uno solo, aún ordenado
 * @param {number[][]} arrs el array de arrays de números que quiero combinar
 * @returns {nuber[]} el nuevo array de números ordenados
 */

exports.combinarNArrays = function (arrs) {
    res = arrs.shift()

    arrs.forEach(singleArr => {
        res = mergeArrays(res, singleArr, false)
    });

    return res.sort((a, b) => a - b);
}

// exportar ambas funciones