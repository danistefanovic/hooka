import getConfig from './getConfig';
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

function displayServerInformation({ port }) {
    console.log(`Hooka webhook server is running on port ${port}`); // eslint-disable-line no-console
}
