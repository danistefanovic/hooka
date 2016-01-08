import fs from 'fs';
import path from 'path';
import webhookServer from '../server';

export default function run(argv) {
    const config = getConfig(argv.config);
    const app = webhookServer.create();
    const router = webhookServer.createRouter({ hooks: config });
    app.use(router);
    app.listen(argv.port, () => {
        displayServerInformation(argv);
    });
}

function getConfig(relativePath) {
    const configPath = path.resolve(process.cwd(), relativePath);
    if (fs.existsSync(configPath)) return require(configPath);
    console.log(`Error: webhook config file ${configPath} doesn't exist`);
    process.exit(1);
}

function displayServerInformation({ port }) {
    console.log(`Hooka is running on port ${port}`);
}
