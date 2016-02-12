import searchInJson from './searchInJson';

/**
 * Extracts values from JSON and stores it to the corresponding variable
 * @param {Object} json JSON to search in
 * @param {Array} queries Array of query objects: { variable: <string>, query: <string> }
 * @return {Object} Array-like objects with all variables
 */
export default function pickVariablesFromJson(json = {}, queries = []) {
    return queries.reduce((result, item) => {
        result[item.variable] = searchInJson(json, item.query);
        return result;
    }, {});
}
