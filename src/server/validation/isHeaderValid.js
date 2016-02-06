import doesRuleMatch from './doesRuleMatch';

/**
 * Checks if the HTTP header matches the provided validation rule
 * @param {Object} req HTTP request object
 * @param {Object} rule Validation rule
 * @param {string} rule.find Name of HTTP header
 * @return {Boolean}
 */
export default function isHeaderValid(req, rule) {
    const value = req.headers[rule.find.toLowerCase()];
    return doesRuleMatch(rule, value, { payload: req.rawBody });
}
