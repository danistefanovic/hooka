import create from '../../../src/server/logPrinter/create';

describe('logPrinter create', () => {
    it('should expose the logger API', () => {
        const logger = create('example');
        const methods = Object.keys(logger);
        expect(methods.length).toBe(4);
        expect(methods).toContain('log');
        expect(methods).toContain('logError');
        expect(methods).toContain('logStart');
        expect(methods).toContain('logExit');
    });
});
