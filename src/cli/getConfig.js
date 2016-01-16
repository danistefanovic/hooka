import path from 'path';

export default function getConfig(relativePath) {
    const configPath = path.resolve(process.cwd(), relativePath);
    try {
        return require(configPath);
    } catch (e) {
        throw new Error(`Config file ${configPath} doesn't exist`);
    }
}
