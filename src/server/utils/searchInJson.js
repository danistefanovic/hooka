import _ from 'lodash';

/**
 * Searches for a key/value in JSON/object
 *
 * @example
 * searchInJson({ foo: [{ bar: 99 }] }, 'json.foo.0.bar')
 *
 * @param {Object} json
 * @param {string} query JSON path in dot-notation
 * @return {string|number|boolean}
 */
export default function searchInJson(json, query) {
    return _(query.split('.'))
        // Remove first element
        .drop()
        .reduce((prev, key) => {
            if (prev && prev[key]) {
                return prev[key];
            }
        }, json);
}
