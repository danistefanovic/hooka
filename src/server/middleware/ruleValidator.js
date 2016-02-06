import isRequestValid from '../validation/isRequestValid';

/**
 * Rule validator Express middleware
 * @see https://github.com/danistefanovic/hooka/blob/master/docs/webhooks.md#validate
 * @param {Array} validationRules Validation rules
 * @return {void}
 */
export default function ruleValidator(validationRules) {
    return (req, res, next) => {
        if (validationRules && !isRequestValid(req, validationRules)) {
            return res.status(400).send('Bad request');
        }
        next();
    };
}
