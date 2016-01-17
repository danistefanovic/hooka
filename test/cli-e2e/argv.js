import path from 'path';
import serverReady from 'server-ready';
import cli from '../helpers/cli';

const defaultPort = 3000;
const testFolder = path.join(__dirname, '../');
let port = defaultPort + 1;

describe('CLI argv', () => {
    let child = null;

    beforeEach(() => {
        port++;
    });

    afterEach(() => {
        child.kill();
    });

    describe('port', () => {
        it('should run on the default port', (callback) => {
            child = cli();
            serverReady(defaultPort, callback);
        });

        it('should run on the provided port', (callback) => {
            child = cli(['--port', port]);
            serverReady(port, callback);
        });

        it('should run on the provided port (alias)', (callback) => {
            child = cli(['-p', port]);
            serverReady(port, callback);
        });
    });

    describe('config file', () => {
        it('should start if a webhooks.json file is in the CWD', (callback) => {
            child = cli(['--port', port]);
            serverReady(port, callback);
        });

        it('should throw an error if no webhooks.json is found in the CWD', (callback) => {
            const handleServerReady = jasmine.createSpy('handleServerReady');
            child = cli(['--port', port], path.join(testFolder, 'cli-e2e'));
            serverReady(port, handleServerReady);
            child.on('close', (code) => {
                expect(code).toBe(1);
                expect(handleServerReady).not.toHaveBeenCalled();
                callback();
            });
        });

        it('should start if the provided config file is available', (callback) => {
            child = cli(['--port', port, '--config', path.join(testFolder, 'webhooks.json')]);
            serverReady(port, callback);
        });

        it('should start if the provided config file is available (alias)', (callback) => {
            child = cli(['--port', port, '-c', path.join(testFolder, 'webhooks.json')]);
            serverReady(port, callback);
        });

        it('should throw an error if the provided config file is not available', (callback) => {
            const handleServerReady = jasmine.createSpy('handleServerReady');
            child = cli(['--port', port, '--config', path.join(testFolder, 'nope.json')]);
            serverReady(port, handleServerReady);
            child.on('close', (code) => {
                expect(code).toBe(1);
                expect(handleServerReady).not.toHaveBeenCalled();
                callback();
            });
        });
    });
});
