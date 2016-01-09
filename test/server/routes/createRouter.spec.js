import createRouter, { __RewireAPI__ as rewireAPI } from '../../../src/server/routes/createRouter';

describe('createRouter', () => {
    let registerHooks = null;

    beforeEach(() => {
        registerHooks = jasmine.createSpy('registerHooks');
        rewireAPI.__Rewire__('registerHooks', registerHooks);
    });

    afterEach(() => {
        rewireAPI.__ResetDependency__('registerHooks');
    });

    it('should return a router', () => {
        const actual = createRouter();
        expect(actual).toBeDefined();
    });

    it('should call registerHooks', () => {
        const hooks = [1, 2, 3, 'a', 'b', 'c'];

        createRouter(hooks);
        expect(registerHooks).toHaveBeenCalledWith({
            router: jasmine.anything(),
            hooks: hooks
        });
    });
});
