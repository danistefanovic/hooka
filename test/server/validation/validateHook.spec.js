import validateHook from '../../../src/server/validation/validateHook';

const mockHook = {
    method: 'GET',
    path: '/foo',
    command: 'echo bar'
};

describe('validateHook', () => {
    it('should only allow a HTTP method or an array HTTP methods as "method"', () => {
        const valid = ['GET', 'POST', 'PUT', 'DELETE', ['GET', 'POST']];
        const invalid = ['NONSENSE', ['GET', 'NONSENSE'], '', 0, 42, null, NaN, () => {}, {}, []];
        testValidValues(valid, 'method');
        testInvalidValues(invalid, 'method');
    });

    it('should only allow a relative URL as "path"', () => {
        const valid = [
            '/', '/hello', '/hello/world', '/hello/', '/hello/again/', '/hello/hi/hallo/hey',
            '/buenos-dias', '/buenos-dias-muchacho', '/buenos-dias/muchacha-latas',
            '/hello1', '/1hello', '/1', '/2/', '/3/4', '/1234567890'
        ];
        const invalid = [
            'hello', 'hello/', '/hello?', '/hello.php', '/he$llo',
            'hello/again', 'hello/again/', '/hello?/again', '/he$lllo/again',
            '', 0, 42, null, undefined, NaN, () => {}, {}, []
        ];
        testValidValues(valid, 'path');
        testInvalidValues(invalid, 'path');
    });

    it('should only allow a string as "command"', () => {
        const valid = ['echo', 'ls'];
        const invalid = ['', 0, 42, null, NaN, () => {}, {}, []];
        testValidValues(valid, 'command');
        testInvalidValues(invalid, 'command');
    });

    it('should only allow a string as "cwd" if provided', () => {
        const valid = [undefined];
        const invalid = ['', 0, 42, null, NaN, () => {}, {}, []];
        testValidValues(valid, 'cwd');
        testInvalidValues(invalid, 'cwd');
    });

    it('should only allow an array as "validate" if provided', () => {
        const valid = [undefined, []];
        const invalid = ['', 0, 42, null, NaN, () => {}, {}];
        testValidValues(valid, 'validate');
        testInvalidValues(invalid, 'validate');
    });

    it('should only allow an array of objects with a specific schema for "validate"', () => {
        const valid = [
            [
                { source: 'jsonBody', find: 'payload.foo', match: 'exactly', value: 'bar' },
                { source: 'urlencodedBody', find: 'foo', match: 'Exactly', value: 2 },
                { source: 'HeAdEr', find: 'x-foo', match: 'regExp', value: 'bar$' }
            ]
        ];
        const invalid = [
            [{ source: 'a', find: 'payload.foo', match: 'exactly', value: 'bar' }],
            [{ source: 'urlencodedBody', find: 2, match: 'Exactly', value: 'bar' }],
            [{ source: 'HeAdEr', find: 'x-foo', match: 'nonsene', value: 'bar$' }],
            [{ find: 'payload.foo', match: 'exactly', value: 'bar' }],
            [{ source: 'urlencodedBody', match: 'Exactly', value: 2 }],
            [{ source: 'HeAdEr', find: 'x-foo', value: 'bar$' }],
            [{ source: 'jsonBody', find: 'payload.foo', match: 'exactly' }]
        ];
        testValidValues(valid, 'validate');
        testInvalidValues(invalid, 'validate');
    });

    it('should only allow an array as "parseJson" if provided', () => {
        const valid = [undefined, []];
        const invalid = ['', 0, 42, null, NaN, () => {}, {}];
        testValidValues(valid, 'parseJson');
        testInvalidValues(invalid, 'parseJson');
    });

    it('should only allow an array of objects with a specific schema for "parseJson"', () => {
        const valid = [
            [
                { query: 'foo', variable: 'bar' },
                { query: 'foo.bar', variable: 'FOOBAR' }
            ]
        ];
        const invalid = [
            [{ query: 1, variable: 'bar' }],
            [{ query: [], variable: 'bar' }],
            [{ variable: 'bar' }],
            [{ query: 'foo', variable: 1 }],
            [{ query: 'foo', variable: [] }],
            [{ query: 'foo' }]
        ];
        testValidValues(valid, 'parseJson');
        testInvalidValues(invalid, 'parseJson');
    });
});

function testValidValues(values, optionName) {
    values.forEach((value) => {
        expect(
            validateHook.bind(null, {
                ...mockHook,
                [optionName]: value
            })
        ).not.toThrow();
    });
}

function testInvalidValues(values, optionName) {
    values.forEach((value) => {
        expect(
            validateHook.bind(null, {
                ...mockHook,
                [optionName]: value
            })
        ).toThrow();
    });
}
