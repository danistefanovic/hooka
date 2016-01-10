import fs from 'fs';
import path from 'path';
import webhookServer from '../server';

export default function run(argv) {
    const config = getConfig(argv.config);
    const app = webhookServer.create();
    const router = webhookServer.createRouter(config);
    app.use(router);
    app.listen(argv.port, () => {
        displayServerInformation(argv);
    });
}

function getConfig(relativePath) {
    const configPath = path.resolve(process.cwd(), relativePath);
    fs.accessSync(configPath, (err) => { // eslint-disable-line no-sync
        if (err) throw new Error(`Config file ${configPath} doesn't exist`);
    });
    return require(configPath);
}

function displayServerInformation({ port }) {
    console.log(`Hooka webhook server is running on port ${port}`); // eslint-disable-line no-console
}
