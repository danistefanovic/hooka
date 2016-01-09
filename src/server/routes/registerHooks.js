import runCommand from '../runCommand';

export default function registerHooks({ router, hooks }) {
    if (!router) throw new Error('No router provided');
    if (!hooks) throw new Error('No hooks provided');

    hooks.forEach((hook) => {
        registerHook({ router, ...hook });
    });
}

function registerHook(params) {
    if (Array.isArray(params.method)) {
        params.method.forEach((m) => registerHook({ ...params, method: m }));
    } else {
        addRoute(params);
    }
}

function addRoute({ router, method, path, command }) {
    router[method.toLowerCase()](path, (req, res) => {
        runCommand(command);
        res.json({ path, requestReceivedAt: Date.now() });
    });
}
