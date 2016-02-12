import express from 'express';

/**
 * Creates an Express server
 * @return {Object}
 */
export default function create() {
    const server = express();
    server.set('x-powered-by', false);
    return server;
}
