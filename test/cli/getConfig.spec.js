import getConfig from '../../src/cli/getConfig';

describe('cli getConfig', () => {
    it('should return the specified JSON webhooks config', () => {
        const config = getConfig('test/webhooks.json');
        expect(config.length).toBe(2);
        expect(config[0]).toEqual({
            method: 'GET',
            path: '/test1',
            command: 'echo hello test1'
        });
        expect(config[1]).toEqual({
            method: ['GET', 'POST'],
            path: '/test2',
            command: 'echo hello test2'
        });
    });

    it('should throw an error if the file was not found', () => {
        expect(getConfig.bind(null, 'nope.json')).toThrow();
    });
});
