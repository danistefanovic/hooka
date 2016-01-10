import logPrinter from '../../../src/server/logPrinter';

describe('logPrinter', () => {
    it('exposes the public API', () => {
        const methods = Object.keys(logPrinter);
        expect(methods.length).toBe(1);
        expect(methods).toContain('create');
    });
});
