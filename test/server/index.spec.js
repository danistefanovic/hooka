import server from '../../src/server';

describe('server', () => {
    it('exposes the public API', () => {
        const methods = Object.keys(server);
        expect(methods.length).toBe(3);
        expect(methods).toContain('create');
        expect(methods).toContain('createRouter');
        expect(methods).toContain('listen');
    });
});
