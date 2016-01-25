import getConfig from '../../src/cli/getConfig';

describe('cli getConfig', () => {
    it('should return the specified JSON webhooks config', () => {
        const config = getConfig('test/webhooks.json');
        expect(config.length).toBe(3);
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
        expect(config[2]).toEqual({
            method: 'POST',
            path: '/test3',
            command: 'echo hello test3',
            parseJson: [
                {
                    query: 'payload.items.0.foo.bar',
                    variable: 'varTest3'
                }
            ]
        });
    });

    it('should throw an error if the file was not found', () => {
        expect(getConfig.bind(null, 'nope.json')).toThrowError(/doesn't exist/);
    });

    it('should throw an error if the file contains no valid JSON', () => {
        expect(getConfig.bind(null, 'test/.eslintrc')).toThrowError(/doesn't contain valid JSON/);
    });
});
