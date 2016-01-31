import isRequestValid from '../validation/isRequestValid';

export default function ruleValidator(validationRules) {
    return (req, res, next) => {
        if (validationRules && !isRequestValid(req, validationRules)) {
            return res.status(400).send('Bad request');
        }
        next();
    };
}
