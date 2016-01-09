import create from '../../src/server/create';

describe('server create', () => {
    it('should return an express server', () => {
        const actual = create();
        expect(actual).toEqual(jasmine.any(Function));
    });

    it('should have x-powered-by disabled', () => {
        const actual = create();
        expect(actual.settings['x-powered-by']).toBe(false);
    });
});
