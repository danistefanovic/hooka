import fs from 'fs';

/**
 * Returns the content of a file
 * @param {string} path Path to file
 * @param {string} description
 * @return {Object} Buffer
 */
export default function readFile(path, description = 'File') {
    if (!path) throw new Error(`${description} path is not set`);
    try {
        return fs.readFileSync(path);// eslint-disable-line no-sync
    } catch (e) {
        throw new Error(`${description} does not exist or cannot be read: ${path}`);
    }
}
