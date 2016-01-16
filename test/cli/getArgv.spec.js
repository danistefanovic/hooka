import getArgv from '../../src/cli/getArgv';

describe('cli getArgv', () => {
    it('should have the correct defaults', () => {
        const argv = getArgv();
        expect(argv.config).toBe('webhooks.json');
        expect(argv.port).toBe(3000);
        expect(argv.secret).toBe(false);
    });
});
