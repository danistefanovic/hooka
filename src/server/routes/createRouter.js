import express from 'express';
import registerHooks from './registerHooks';

export default function createRouter(hooks) {
    const router = express.Router();
    registerHooks({ router, hooks });
    return router;
}
