import express from 'express';
import registerHooks from './registerHooks';
import registerMiddleware from './registerMiddleware';

export default function createRouter(hooks, secret) {
    const router = express.Router();
    registerMiddleware({ router, secret });
    registerHooks({ router, hooks });
    return router;
}
