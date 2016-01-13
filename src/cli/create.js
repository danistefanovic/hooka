import path from 'path';
import webhookServer from '../server';

export default function create(argv) {
    const hooks = getConfig(argv.config);
    const app = webhookServer.create();
    const router = webhookServer.createRouter(hooks, argv.secret);
    app.use(router);

    return app.listen(argv.port, () => {
        displayServerInformation(argv);
    });
}

function getConfig(relativePath) {
    const configPath = path.resolve(process.cwd(), relativePath);
    try {
        return require(configPath);
    } catch (e) {
        throw new Error(`Config file ${configPath} doesn't exist`);
    }
}

function displayServerInformation({ port }) {
    console.log(`Hooka webhook server is running on port ${port}`); // eslint-disable-line no-console
}
