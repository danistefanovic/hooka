import getConfig from './getConfig';
import webhookServer from '../server';

/**
 * Creates the webhook server and runs it
 * @param {Object} argv CLI arguments
 * @return {void}
 */
export default function run(argv) {
    const hooks = getConfig(argv.config);
    const app = webhookServer.create();
    const router = webhookServer.createRouter(hooks, argv.secret);
    const options = { tlsCert: argv['tls-cert'], tlsKey: argv['tls-key'] };
    app.use(router);

    webhookServer.listen(app, argv.port, options, () => {
        console.log(`Hooka webhook server is running on port ${argv.port}`); // eslint-disable-line no-console
    });
}
