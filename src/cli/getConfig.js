import fs from 'fs';
import path from 'path';

/**
 * Returns the hook entries
 * @param {string} relativePath Path to config file
 * @return {Array} hooks
 */
export default function getConfig(relativePath) {
    const configPath = path.resolve(process.cwd(), relativePath);

    try {
        fs.accessSync(configPath, fs.F_OK); // eslint-disable-line no-sync
    } catch (e) {
        throw new Error(`Config file ${configPath} doesn't exist`);
    }

    try {
        return require(configPath);
    } catch (e) {
        throw new Error(`Config file ${configPath} doesn't contain valid JSON`);
    }
}
