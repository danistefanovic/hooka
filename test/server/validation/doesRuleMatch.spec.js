import doesRuleMatch from '../../../src/server/validation/doesRuleMatch';

describe('doesRuleMatch', () => {
    describe('match exactly', () => {
        it('should return true if the values match exactly', () => {
            const value = 'example';
            const rule = { match: 'exactly', value: 'example' };
            expect(doesRuleMatch(rule, value)).toBe(true);
        });

        it('should return false if the values do not match exactly', () => {
            const value = 'a';
            const rule = { match: 'exactly', value: 'b' };
            expect(doesRuleMatch(rule, value)).toBe(false);
        });

        it('should return false if value types do not match', () => {
            const value = '99';
            const rule = { match: 'exactly', value: 99 };
            expect(doesRuleMatch(rule, value)).toBe(false);
        });
    });

    describe('match RegExp', () => {
        it('should return true if the RegExp matches', () => {
            const value = 'example';
            const rule = { match: 'regexp', value: 'ple$' };
            expect(doesRuleMatch(rule, value)).toBe(true);
        });

        it('should return false if the RegExp does not match', () => {
            const value = 'eexample';
            const rule = { match: 'regexp', value: '^ex' };
            expect(doesRuleMatch(rule, value)).toBe(false);
        });
    });
});
