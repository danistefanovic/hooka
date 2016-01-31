import areObjectValuesDefined from '../utils/areObjectValuesDefined';
import pickVariablesFromJson from '../utils/pickVariablesFromJson';

export default function parseJsonValidator(parseJson) {
    return (req, res, next) => {
        const env = pickVariablesFromJson(req.body, parseJson);
        if (parseJson && !areObjectValuesDefined(env)) {
            return res.status(400).send('JSON path does not match');
        }
        next();
    };
}
