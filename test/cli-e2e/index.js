import serverReady from 'server-ready';
import supertest from 'supertest';
import cli from '../helpers/cli';

let port = 3300;

describe('CLI e2e', () => {
    let child = null;
    let request = null;

    beforeEach((callback) => {
        port++;
        child = cli(['--port', port]);
        request = supertest(`http://localhost:${port}`);
        serverReady(port, callback);
    });

    afterEach(() => {
        child.kill();
    });

    it('should print the ouput of the command to STDOUT', (callback) => {
        request.get('/test1').expect(200).end(() => {
            let output = '';
            child.stdout.on('data', (data) => {
                output += data.toString();
                if (output.includes(' | hello test1')) {
                    return callback();
                }
            });
        });
    });

    it('should print the exit code of the command to STDOUT', (callback) => {
        request.post('/test2').expect(200).end(() => {
            let output = '';
            child.stdout.on('data', (data) => {
                output += data.toString();
                if (output.includes(' exited with code 0')) {
                    return callback();
                }
            });
        });
    });

    it('should not trigger a command when no valid hook was found', (callback) => {
        const startMessage = `Hooka webhook server is running on port ${port}\n`;
        const stdoutSpy = jasmine.createSpy('stdoutSpy');
        child.stdout.on('data', stdoutSpy);
        request.post('/test99').expect(404).end(() => {
            expect(stdoutSpy.calls.count()).toBe(1);
            expect(stdoutSpy.calls.argsFor(0)).toEqual([new Buffer(startMessage)]);
            callback();
        });
    });
});
