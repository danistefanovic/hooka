import registerHooks, { __RewireAPI__ as rewireAPI } from '../../../src/server/routes/registerHooks';

describe('registerHooks', () => {
    let addRoute = null;
    const mockRouter = {};

    const mockHooks = [
        { method: 'GET', path: '/foo', command: 'echo bar' },
        { method: ['GET', 'POST'], path: '/hello', command: 'echo hello world' }
    ];

    beforeEach(() => {
        addRoute = jasmine.createSpy('addRoute');
        rewireAPI.__Rewire__('addRoute', addRoute);
    });

    afterEach(() => {
        rewireAPI.__ResetDependency__('addRoute');
    });

    it('should throw an error if no router is provided', () => {
        const actual = registerHooks.bind(null, null, mockHooks);
        expect(actual).toThrow();
    });

    it('should throw an error if no hooks are provided', () => {
        const actual = registerHooks.bind(null, mockRouter);
        expect(actual).toThrow();
    });

    it('should register a hook for every HTTP method', () => {
        registerHooks(mockRouter, mockHooks);
        expect(addRoute.calls.count()).toBe(3);
        expect(addRoute.calls.argsFor(0)).toEqual([{
            router: mockRouter,
            method: 'GET',
            path: '/foo',
            command: 'echo bar'
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
