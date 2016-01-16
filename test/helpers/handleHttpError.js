export default function handleHttpError(callback, error) {
    return error ? callback.fail(error) : callback();
}
