import colors, { error } from '../../../src/server/logPrinter/colors';

describe('logPrinter colors', () => {
    it('should have at least 3 colors defined', () => {
        expect(colors.length).toBeGreaterThan(2);
    });

    it('should have the error color defined', () => {
        expect(error).toBeDefined();
    });
});
