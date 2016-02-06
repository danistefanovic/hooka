import searchInJson from '../utils/searchInJson';
import doesRuleMatch from './doesRuleMatch';

/**
 * Checks if the JSON request body matches the provided validation rule
 * @param {Object} req HTTP request object
 * @param {Object} rule Validation rule
 * @param {string} rule.find JSON path
 * @return {Boolean}
 */
export default function isJsonBodyValid(req, rule) {
    const value = searchInJson(req.body, rule.find);
    return doesRuleMatch(rule, value);
}
