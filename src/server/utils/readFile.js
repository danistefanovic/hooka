import fs from 'fs';

export default function readFile(path, description = 'File') {
    if (!path) throw new Error(`${description} path is not set`);
    try {
        return fs.readFileSync(path);// eslint-disable-line no-sync
    } catch (e) {
        throw new Error(`${description} does not exist or cannot be read: ${path}`);
    }
}
