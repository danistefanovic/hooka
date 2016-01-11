import validateHook from '../../../src/server/utils/validateHook';

describe('validateHook', () => {
    const nonStrings = ['', 0, 42, null, undefined, NaN, () => {}, {}, []];

    const mockHooks = [
        { method: 'GET', path: '/foo', command: 'echo bar' },
        { method: ['get', 'Post', 'PUT', 'DELETE'], path: '/hello', command: 'echo hello world' }
    ];

    it('should only allow a HTTP method or an array HTTP methods as "method"', () => {
        expect(validateHook.bind(null, mockHooks[0])).not.toThrow();
        expect(validateHook.bind(null, mockHooks[1])).not.toThrow();
        expect(validateHook.bind(null, { ...mockHooks[0], method: 'NONSENSE' })).toThrow();
        expect(validateHook.bind(null, { ...mockHooks[0], method: ['GET', 'NONSENSE'] })).toThrow();
        nonStrings.forEach((nonString) => {
            expect(validateHook.bind(null, { ...mockHooks[0], method: nonString })).toThrow();
        });
    });

    it('should only allow a relative URL as "path"', () => {
        const validPaths = [
            '/', '/hello', '/hello/world', '/hello/', '/hello/again/', '/hello/hi/hallo/hey',
            '/buenos-dias', '/buenos-dias-muchacho', '/buenos-dias/muchacha-latas',
            '/hello1', '/1hello', '/1', '/2/', '/3/4', '/1234567890'
        ];

        const invalidPaths = [
            'hello', 'hello/', '/hello?', '/hello.php', '/he$llo',
            'hello/again', 'hello/again/', '/hello?/again', '/he$lllo/again'
        ];

        validPaths.forEach((validPath) => {
            expect(validateHook.bind(null, { ...mockHooks[0], path: validPath })).not.toThrow();
        });

        [...nonStrings, ...invalidPaths].forEach((invalidPath) => {
            expect(validateHook.bind(null, { ...mockHooks[0], path: invalidPath })).toThrow();
        });
    });

    it('should only allow a string as "command"', () => {
        expect(validateHook.bind(null, mockHooks[0])).not.toThrow();
        nonStrings.forEach((nonString) => {
            expect(validateHook.bind(null, { ...mockHooks[0], command: nonString })).toThrow();
        });
    });
});
