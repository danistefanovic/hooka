export default function areObjectValuesDefined(obj) {
    return Object.keys(obj)
        .map((key) => obj[key])
        .reduce((prev, value) => {
            return prev && value !== undefined;
        }, true);
}
