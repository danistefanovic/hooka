/**
 * Checks if a value matches the specified validation rule
 * @param {Object} rule Validation rule
 * @param {string} rule.match Match type
 * @param {*} rule.value Expected value
 * @param {*} value Value to check against the expected value
 * @return {boolean}
 */
export default function doesRuleMatch(rule, value) {
    const match = rule.match.toLowerCase();

    if (match === 'exactly') return doesMatchExactly(rule, value);
    if (match === 'regexp') return doesMatchRegExp(rule, value);

    throw new Error(`Unknown matcher: ${rule.match}`);
}

function doesMatchExactly(rule, value) {
    return rule.value === value;
}

function doesMatchRegExp(rule, value) {
    if (!value) return false;
    const position = value.search(new RegExp(rule.value));
    return position !== -1;
}
