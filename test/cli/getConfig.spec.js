import getConfig from '../../src/cli/getConfig';
import webhooksJson from '../webhooks.json';

describe('cli getConfig', () => {
    it('should return the specified JSON webhooks config', () => {
        const config = getConfig('test/webhooks.json');
        expect(config).toEqual(webhooksJson);
    });

    it('should throw an error if the file was not found', () => {
        expect(getConfig.bind(null, 'nope.json')).toThrowError(/doesn't exist/);
    });

    it('should throw an error if the file contains no valid JSON', () => {
        expect(getConfig.bind(null, 'test/.eslintrc')).toThrowError(/doesn't contain valid JSON/);
    });
});
