import normalizeArgs, { __RewireAPI__ as rewireAPI } from '../../../src/server/process/normalizeArgs';

describe('normalizeArgs', () => {
    afterEach(() => {
        rewireAPI.__ResetDependency__('process');
    });

    it('should normalize for Windows with no COMSPEC', () => {
        rewireAPI.__Rewire__('process', {
            platform: 'win32',
            env: {}
        });

        const result = normalizeArgs('echo Hello world');
        expect(result).toEqual({
            file: 'cmd.exe',
            args: ['/s', '/c', 'echo Hello world'],
            options: { windowsVerbatimArguments: true }
        });
    });

    it('should normalize for Windows with COMSPEC defined', () => {
        rewireAPI.__Rewire__('process', {
            platform: 'win32',
            env: { comspec: 'command.com' }
        });

        const result = normalizeArgs('echo Hello again');
        expect(result).toEqual({
            file: 'command.com',
            args: ['/s', '/c', 'echo Hello again'],
            options: { windowsVerbatimArguments: true }
        });
    });

    it('should normalize for Unix-like systems', () => {
        rewireAPI.__Rewire__('process', {
            platform: 'darwin'
        });

        const result = normalizeArgs('echo Hello from the other side');
        expect(result).toEqual({
            file: '/bin/sh',
            args: ['-c', 'echo Hello from the other side'],
            options: {}
        });
    });
});
