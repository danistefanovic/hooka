import mockSpawn from 'mock-spawn';
import runCommand, { __RewireAPI__ as rewireAPI } from '../../../src/server/process/runCommand';

describe('runCommand', () => {
    let spawn = null;
    let handleStdout = null;
    let handleStderr = null;
    let handleClose = null;

    beforeEach(() => {
        spawn = mockSpawn();
        handleStdout = jasmine.createSpy('handleStdout');
        handleStderr = jasmine.createSpy('handleStderr');
        handleClose = jasmine.createSpy('handleClose').and.callFake((id, resolve) => resolve());
        rewireAPI.__Rewire__('spawn', spawn);
        rewireAPI.__Rewire__('handleStdout', handleStdout);
        rewireAPI.__Rewire__('handleStderr', handleStderr);
        rewireAPI.__Rewire__('handleClose', handleClose);
    });

    afterEach(() => {
        rewireAPI.__ResetDependency__('spawn');
        rewireAPI.__ResetDependency__('handleStdout');
        rewireAPI.__ResetDependency__('handleStderr');
        rewireAPI.__ResetDependency__('handleClose');
    });

    it('should handle data on STDOUT', (callback) => {
        spawn.sequence.add(spawn.simple(0, 'Hello'));

        runCommand('dosomething').then(() => {
            expect(handleStdout.calls.count()).toBe(1);
            expect(handleStderr.calls.count()).toBe(0);
            expect(handleClose.calls.count()).toBe(1);
            expect(spawn.calls.length).toBe(1);
            callback();
        }).catch((reason) => {
            throw new Error(`Oops, something went wrong: ${reason}`);
        });
    });

    it('should handle data on STDERR', (callback) => {
        spawn.sequence.add(spawn.simple(0, null, 'Goodbye'));

        runCommand('dosomething').then(() => {
            expect(handleStdout.calls.count()).toBe(0);
            expect(handleStderr.calls.count()).toBe(1);
            expect(handleClose.calls.count()).toBe(1);
            expect(spawn.calls.length).toBe(1);
            callback();
        }).catch((reason) => {
            throw new Error(`Oops, something went wrong: ${reason}`);
        });
    });

    it('should spawn a process with the provided options', () => {
        const options = { cwd: '/test' };
        const spawn = jasmine.createSpy('spawn');
        rewireAPI.__Rewire__('spawn', spawn);
        runCommand('dosomething', options);
        expect(spawn.calls.count()).toBe(1);
        expect(spawn.calls.argsFor(0)[2]).toEqual(options);
    });
});
