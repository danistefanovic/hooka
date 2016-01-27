import bodyParser from 'body-parser';

export default function registerMiddleware({ router }) {
    if (!router) throw new Error('No router provided');

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));
}
