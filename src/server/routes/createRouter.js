import express from 'express';
import registerHooks from './registerHooks';
import registerMiddleware from './registerMiddleware';

/**
 * Creates the router
 * @param {Array} hooks Hook entries
 * @return {Object}
 */
export default function createRouter(hooks) {
    const router = express.Router();
    registerMiddleware({ router });
    registerHooks({ router, hooks });
    return router;
}
