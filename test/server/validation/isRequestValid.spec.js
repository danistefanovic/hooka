import isRequestValid, { __RewireAPI__ as rewireAPI } from '../../../src/server/validation/isRequestValid';

describe('isRequestValid', () => {
    let isJsonBodyValid = null;
    let isUrlEncodedBodyValid = null;
    let isHeaderValid = null;

    const req = {};

    const rules = [
        { source: 'jsonbody', find: 'json.foo', match: 'exactly', value: 'bar' },
        { source: 'urlencodedbody', find: 'foo', match: 'exactly', value: 'bar' },
        { source: 'header', find: 'X-foo', match: 'exactly', value: 'bar' }
    ];

    beforeEach(() => {
        isJsonBodyValid = jasmine.createSpy();
        isUrlEncodedBodyValid = jasmine.createSpy();
        isHeaderValid = jasmine.createSpy();
        rewireAPI.__Rewire__('isJsonBodyValid', isJsonBodyValid);
        rewireAPI.__Rewire__('isUrlEncodedBodyValid', isUrlEncodedBodyValid);
        rewireAPI.__Rewire__('isHeaderValid', isHeaderValid);
    });

    afterEach(() => {
        rewireAPI.__ResetDependency__('isValid');
        rewireAPI.__ResetDependency__('isJsonBodyValid');
        rewireAPI.__ResetDependency__('isUrlEncodedBodyValid');
        rewireAPI.__ResetDependency__('isHeaderValid');
    });

    it('should check every validation rule if all rules are valid ', () => {
        const isValid = jasmine.createSpy().and.callFake(() => true);
        rewireAPI.__Rewire__('isValid', isValid);
        isRequestValid(req, rules);
        expect(isValid.calls.count()).toBe(3);
    });

    it('should check every validation rule until the first returns false', () => {
        let counter = 0;
        const isValid = jasmine.createSpy().and.callFake(() => (++counter < 2));
        rewireAPI.__Rewire__('isValid', isValid);
        isRequestValid(req, rules);
        expect(isValid.calls.count()).toBe(2);
    });

    it('should throw an error if the source does not exist', () => {
        const rules = [{ source: 'nonsense' }];
        expect(isRequestValid.bind(null, req, rules)).toThrowError(/Unknown validation rule/);
    });

    it('should call isJsonBodyValid', () => {
        isRequestValid(req, [rules[0]]);
        expect(isJsonBodyValid.calls.count()).toBe(1);
        expect(isUrlEncodedBodyValid).not.toHaveBeenCalled();
        expect(isHeaderValid).not.toHaveBeenCalled();
    });

    it('should call isUrlEncodedBodyValid', () => {
        isRequestValid(req, [rules[1]]);
        expect(isUrlEncodedBodyValid.calls.count()).toBe(1);
        expect(isJsonBodyValid).not.toHaveBeenCalled();
        expect(isHeaderValid).not.toHaveBeenCalled();
    });

    it('should call isHeaderValid', () => {
        isRequestValid(req, [rules[2]]);
        expect(isHeaderValid.calls.count()).toBe(1);
        expect(isJsonBodyValid).not.toHaveBeenCalled();
        expect(isUrlEncodedBodyValid).not.toHaveBeenCalled();
    });
});
