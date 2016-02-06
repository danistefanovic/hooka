import areObjectValuesDefined from '../utils/areObjectValuesDefined';
import pickVariablesFromJson from '../utils/pickVariablesFromJson';

/**
 * "parseJson" Express middelware
 * @see https://github.com/danistefanovic/hooka/blob/master/docs/webhooks.md#parsejson
 * @param {Array} parseJson Config for "parseJson"
 * @return {void}
 */
export default function parseJsonValidator(parseJson) {
    return (req, res, next) => {
        const env = pickVariablesFromJson(req.body, parseJson);
        if (parseJson && !areObjectValuesDefined(env)) {
            const variables = JSON.stringify(env, replaceUndefined, '  ');
            return res.status(400).send(`A JSON path does not match: ${variables}`);
        }
        next();
    };
}

function replaceUndefined(key, value) {
    return (value === undefined) ? 'not found' : value;
}
