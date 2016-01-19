import getConfig from './getConfig';
import webhookServer from '../server';

export default function create(argv) {
    const hooks = getConfig(argv.config);
    const app = webhookServer.create();
    const router = webhookServer.createRouter(hooks, argv.secret);
    const options = { tlsCert: argv['tls-cert'], tlsKey: argv['tls-key'] };
    app.use(router);

    return webhookServer.listen(app, argv.port, options, () => {
        console.log(`Hooka webhook server is running on port ${argv.port}`); // eslint-disable-line no-console
    });
}
