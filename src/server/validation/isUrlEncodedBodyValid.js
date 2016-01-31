import doesRuleMatch from './doesRuleMatch';

/**
 * Checks if the urlencoded request body the provided validation rule
 * @param {Object} req HTTP request object
 * @param {Object} rule Validation rule
 * @param {string} rule.find Key
 * @return {Boolean}
 */
export default function isUrlEncodedBodyValid(req, rule) {
    const value = req.body[rule.find];
    return doesRuleMatch(rule, value);
}
