import colorGenerator, { __RewireAPI__ as rewireAPI } from '../../../src/server/logPrinter/colorGenerator';

describe('logPrinter colorGenerator', () => {
    let colorIterator = null;
    const mockColors = ['blue', 'red', 'green'];

    beforeEach(() => {
        colorIterator = colorGenerator();
        rewireAPI.__Rewire__('colors', mockColors);
    });

    afterEach(() => {
        rewireAPI.__ResetDependency__('colors');
    });

    it('should cycle through the colors', () => {
        expect(colorIterator.next().value).toBe(mockColors[0]);
        expect(colorIterator.next().value).toBe(mockColors[1]);
        expect(colorIterator.next().value).toBe(mockColors[2]);
        expect(colorIterator.next().value).toBe(mockColors[0]);
        expect(colorIterator.next().value).toBe(mockColors[1]);
    });
});
