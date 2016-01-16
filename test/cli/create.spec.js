import create, { __RewireAPI__ as rewireAPI } from '../../src/cli/create';

describe('cli create', () => {
    const mockArgv = { config: '' };
    const mockWebhookServer = {
        create: () => ({
            use: () => {},
            listen: () => {}
        }),
        createRouter: () => {},
        getConfig: () => {}
    };

    afterEach(() => {
        rewireAPI.__ResetDependency__('webhookServer');
    });

    it('should create a server', () => {
        const createServer = spyOn(mockWebhookServer, 'create').and.callThrough();
        rewireAPI.__Rewire__('webhookServer', { ...mockWebhookServer, create: createServer });
        create(mockArgv);
        expect(createServer.calls.count()).toBe(1);
    });

    it('should create a router', () => {
        const createRouter = jasmine.createSpy('create router');
        rewireAPI.__Rewire__('webhookServer', { ...mockWebhookServer, createRouter });
        create(mockArgv);
        expect(createRouter.calls.count()).toBe(1);
    });

    it('should register the router', () => {
        const use = jasmine.createSpy('use');
        const createRouter = jasmine.createSpy('create router').and.callFake(() => 123);
        rewireAPI.__Rewire__('webhookServer', {
            ...mockWebhookServer,
            createRouter,
            create: () => ({
                use,
                listen: () => {}
            })
        });
        create(mockArgv);
        expect(use.calls.count()).toBe(1);
        expect(use).toHaveBeenCalledWith(123);
    });
});
