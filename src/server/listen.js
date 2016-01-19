import http from 'http';
import https from 'https';
import readFile from './utils/readFile';

export default function listen(app, port, options, callback = () => {}) {
    if (options && options.tlsCert && options.tlsKey) {
        return https.createServer({
            key: readFile(options.tlsKey, 'TLS key'),
            cert: readFile(options.tlsCert, 'TLS certificate key')
        }, app).listen(port, callback);
    } else {
        return http.createServer(app).listen(port, callback);
    }
}
