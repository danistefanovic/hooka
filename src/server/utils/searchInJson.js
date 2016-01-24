import _ from 'lodash';

export default function searchInJson(json, query) {
    return _(query.split('.'))
        .drop()
        .reduce((prev, key) => {
            return prev[key];
        }, json);
}
