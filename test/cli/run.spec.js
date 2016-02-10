import run, { __RewireAPI__ as rewireAPI } from '../../src/cli/run';

describe('cli run', () => {
    const mockArgv = { config: '', port: 4444 };
    const mockWebhookServer = {
        create: () => ({
            use: () => {},
            listen: () => {}
        }),
        createRouter: () => {},
        listen: () => {}
    };

    afterEach(() => {
        rewireAPI.__ResetDependency__('webhookServer');
    });

    it('should create a server', () => {
        const createServer = spyOn(mockWebhookServer, 'create').and.callThrough();
        rewireAPI.__Rewire__('webhookServer', { ...mockWebhookServer, create: createServer });
        run(mockArgv);
        expect(createServer.calls.count()).toBe(1);
    });

    it('should create a router', () => {
        const createRouter = jasmine.createSpy('create router');
        rewireAPI.__Rewire__('webhookServer', { ...mockWebhookServer, createRouter });
        run(mockArgv);
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
        run(mockArgv);
        expect(use.calls.count()).toBe(1);
        expect(use).toHaveBeenCalledWith(123);
    });

    it('should begin to listen to a port', () => {
        const listen = jasmine.createSpy('listen');
        rewireAPI.__Rewire__('webhookServer', { ...mockWebhookServer, listen });
        run(mockArgv);
        expect(listen.calls.count()).toBe(1);
        expect(listen.calls.argsFor(0)[0]).toEqual(jasmine.any(Object)); // app
        expect(listen.calls.argsFor(0)[1]).toBe(mockArgv.port);
        expect(listen.calls.argsFor(0)[2]).toEqual(jasmine.any(Object)); // options
        expect(listen.calls.argsFor(0)[3]).toEqual(jasmine.any(Function)); // callback
    });
});
