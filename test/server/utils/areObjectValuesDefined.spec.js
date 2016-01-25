import areObjectValuesDefined from '../../../src/server/utils/areObjectValuesDefined';

describe('areObjectValuesDefined', () => {
    it('should return true if the object is emtpy', () => {
        const obj = {};
        expect(areObjectValuesDefined(obj)).toBe(true);
    });

    it('should return true if all values are defined', () => {
        const obj = { a: '1', b: 2, c: null, d: {} };
        expect(areObjectValuesDefined(obj)).toBe(true);
    });

    it('should return false if all values are undefined', () => {
        const obj = { a: undefined, b: undefined, c: undefined };
        expect(areObjectValuesDefined(obj)).toBe(false);
    });

    it('should return false if one value is undefined', () => {
        const obj = { a: undefined, b: 'b', c: 'c' };
        expect(areObjectValuesDefined(obj)).toBe(false);
    });
});
