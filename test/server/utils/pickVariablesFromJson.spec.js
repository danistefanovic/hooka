import pickVariablesFromJson, { __RewireAPI__ as rewireApi } from '../../../src/server/utils/pickVariablesFromJson';

describe('pickVariablesFromJson', () => {
    let searchInJson = null;

    const queries = [
        { query: 'a', variable: 'testA' },
        { query: 'b', variable: 'testB' }
    ];

    beforeEach(() => {
        searchInJson = jasmine.createSpy().and.callFake((json, query) => query + 'var');
        rewireApi.__Rewire__('searchInJson', searchInJson);
    });

    afterEach(() => {
        rewireApi.__ResetDependency__('searchInJson');
    });

    it('should return an array-like object', () => {
        const result = pickVariablesFromJson({}, queries);
        const expected = { testA: 'avar', testB: 'bvar' };
        expect(result).toEqual(expected);
    });

    it('should return an empty object if no queries are provided', () => {
        const result = pickVariablesFromJson();
        const expected = {};
        expect(result).toEqual(expected);
        expect(searchInJson.calls.count()).toBe(0);
    });

    it('should call searchInJson', () => {
        pickVariablesFromJson({}, queries);
        expect(searchInJson.calls.count()).toBe(2);
        expect(searchInJson.calls.argsFor(0)[1]).toEqual('a');
        expect(searchInJson.calls.argsFor(1)[1]).toEqual('b');
    });
});
