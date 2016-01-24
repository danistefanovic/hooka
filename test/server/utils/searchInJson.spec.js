import searchInJson from '../../../src/server/utils/searchInJson';

describe('searchInJson', () => {
    describe('a query that matches', () => {
        describe('with no nesting', () => {
            it('should find a primitive type', () => {
                const json = { a: 'va1' };
                const query = 'json.a';
                expect(searchInJson(json, query)).toEqual('va1');
            });

            it('should find an object', () => {
                const json = { a: { b1: 'vb1', b2: 'vb2' } };
                const query = 'json.a';
                expect(searchInJson(json, query)).toEqual({ b1: 'vb1', b2: 'vb2' });
            });

            it('should find an array', () => {
                const json = { a: ['va1', 'va2'] };
                const query = 'json.a';
                expect(searchInJson(json, query)).toEqual(['va1', 'va2']);
            });
        });

        describe('with nesting', () => {
            it('should find a primitive type', () => {
                const json = { a: { b: 'vb1' } };
                const query = 'json.a.b';
                expect(searchInJson(json, query)).toEqual('vb1');
            });

            it('should find an object', () => {
                const json = { a: { b: { c: 'vc1' } } };
                const query = 'json.a.b';
                expect(searchInJson(json, query)).toEqual({ c: 'vc1' });
            });

            it('should find an array', () => {
                const json = { a: { b: ['vb1', 'vb2'] } };
                const query = 'json.a.b';
                expect(searchInJson(json, query)).toEqual(['vb1', 'vb2']);
            });

            it('should find a deeply nested value', () => {
                const json = { a: { b: { c: { d: { e: 've1' } } } } };
                const query = 'json.a.b.c.d.e';
                expect(searchInJson(json, query)).toEqual('ve1');
            });

            it('should find value via an array index', () => {
                const json = { a: [{ b: 'vb1' }, { b: 'vb2' }] };
                const query = 'json.a.1.b';
                expect(searchInJson(json, query)).toEqual('vb2');
            });
        });
    });
});
