import searchInJson from './searchInJson';

export default function pickVariablesFromJson(json = {}, queries = []) {
    return queries.reduce((result, item) => {
        result[item.variable] = searchInJson(json, item.query);
        return result;
    }, {});
}
