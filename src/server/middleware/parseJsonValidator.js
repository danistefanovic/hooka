import areObjectValuesDefined from '../utils/areObjectValuesDefined';
import pickVariablesFromJson from '../utils/pickVariablesFromJson';

/**
 * "parseJson" Express middelware
 * @see https://github.com/danistefanovic/hooka/blob/master/docs/webhooks.md#parsejson
 * @param {Object} parseJson Config for "parseJson"
 * @return {void}
 */
export default function parseJsonValidator(parseJson) {
    return (req, res, next) => {
        const env = pickVariablesFromJson(req.body, parseJson);
        if (parseJson && !areObjectValuesDefined(env)) {
            return res.status(400).send('JSON path does not match');
        }
        next();
    };
}
