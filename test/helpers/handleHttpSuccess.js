export default function handleHttpSuccess(callback, error, result) {
    if (error) {
        return callback.fail(error);
    } else {
        const keys = Object.keys(result.body);
        expect(keys.length).toBe(2);
        expect(result.body.path).toEqual(result.req.path);
        expect(result.body.requestReceivedAt).toEqual(jasmine.any(Number));
        return callback();
    }
}
