import registerHooks, { __RewireAPI__ as rewireAPI } from '../../../src/server/routes/registerHooks';

describe('registerHooks', () => {
    let addRoute = null;
    const mockRouter = {};

    const mockHooks = [
        { method: 'GET', path: '/foo', command: 'echo bar', cwd: '/tmp' },
        { method: ['GET', 'POST'], path: '/hello', command: 'echo hello world' }
    ];

    beforeEach(() => {
        addRoute = jasmine.createSpy('addRoute');
        rewireAPI.__Rewire__('addRoute', addRoute);
        rewireAPI.__Rewire__('validateHook', () => {});
    });

    afterEach(() => {
        rewireAPI.__ResetDependency__('addRoute');
        rewireAPI.__ResetDependency__('validateHook');
    });

    it('should throw an error if no router is provided', () => {
        const params = { hooks: mockHooks };
        const actual = registerHooks.bind(null, params);
        expect(actual).toThrow();
    });

    it('should throw an error if no hooks are provided', () => {
        const params = { router: mockRouter };
        const actual = registerHooks.bind(null, params);
        expect(actual).toThrow();
    });

    it('should register a hook for every HTTP method', () => {
        registerHooks({ router: mockRouter, hooks: mockHooks });
        expect(addRoute.calls.count()).toBe(3);
        expect(addRoute.calls.argsFor(0)).toEqual([{
            router: mockRouter,
            method: 'GET',
            path: '/foo',
            command: 'echo bar',
            cwd: '/tmp'
        }]);
        expect(addRoute.calls.argsFor(1)).toEqual([{
            router: mockRouter,
            method: 'GET',
            path: '/hello',
            command: 'echo hello world'
        }]);
        expect(addRoute.calls.argsFor(2)).toEqual([{
            router: mockRouter,
            method: 'POST',
            path: '/hello',
            command: 'echo hello world'
        }]);
    });
});
