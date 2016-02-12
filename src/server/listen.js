import http from 'http';
import https from 'https';
import readFile from './utils/readFile';

/**
 * Begins to accept connections
 * @param {Object} app Express app
 * @param {number} port
 * @param {Object} options
 * @param {string} options.tlsCert Path to TLS cert
 * @param {string} options.tlsKey Path to TLS key
 * @param {Function} callback
 * @return {void}
 */
export default function listen(app, port, options, callback = () => {}) {
    if (options && options.tlsCert && options.tlsKey) {
        https.createServer({
            key: readFile(options.tlsKey, 'TLS key'),
            cert: readFile(options.tlsCert, 'TLS certificate key')
        }, app).listen(port, callback);
    } else {
        http.createServer(app).listen(port, callback);
    }
}
