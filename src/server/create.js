import express from 'express';

export default function create() {
    const server = express();
    server.set('x-powered-by', false);
    return server;
}
