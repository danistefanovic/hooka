import isJsonBodyValid from './isJsonBodyValid';
import isUrlEncodedBodyValid from './isUrlEncodedBodyValid';
import isHeaderValid from './isHeaderValid';

/**
 * Checks if request matches validtion rules
 * @param {Object} req Request
 * @param {Array} validationRules Array of rules
 * @return {boolean} valid?
 */
export default function isRequestValid(req, validationRules) {
    return validationRules.every((rule) => isValid(req, rule));
}

function isValid(req, rule) {
    const source = rule.source.toLowerCase();

    if (source === 'jsonbody') return isJsonBodyValid(req, rule);
    if (source === 'urlencodedbody') return isUrlEncodedBodyValid(req, rule);
    if (source === 'header') return isHeaderValid(req, rule);

    throw new Error(`Unknown validation rule: ${rule.source}`);
}
