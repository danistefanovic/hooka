import readFile from '../../../src/server/utils/readFile';

describe('readFile', () => {
    it('should throw an error if no path is provided', () => {
        expect(readFile).toThrowError(/path is not set/);
    });

    it('should throw an error if the file does not exist', () => {
        expect(readFile.bind(null, 'nope.txt')).toThrowError(/does not exist/);
    });

    it('should return the file content', () => {
        const content = readFile('test/server/utils/dummy.txt', 'testfile');
        expect(content).toEqual(new Buffer('hello\n'));
    });
});
