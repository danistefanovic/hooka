/**
 * Checks if all values in a object are defined
 * @param {Object} obj The object
 * @return {boolean}
 */
export default function areObjectValuesDefined(obj) {
    return Object.keys(obj)
        .map((key) => obj[key])
        .every(isDefined);
}

function isDefined(value) {
    return value !== undefined;
}
