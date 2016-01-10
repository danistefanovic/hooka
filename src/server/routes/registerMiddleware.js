import bodyParser from 'body-parser';
import secretToken from './secretTokenMiddleware';

export default function registerMiddleware({ router, secret }) {
    if (!router) throw new Error('No router provided');

    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(secretToken(secret));
}
