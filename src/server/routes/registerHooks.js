import validateHook from '../utils/validateHook';
import runCommand from '../process/runCommand';

export default function registerHooks({ router, hooks }) {
    if (!router) throw new Error('No router provided');
    if (!hooks) throw new Error('No hooks provided');

    hooks.forEach((hook) => {
        validateHook(hook);
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

function addRoute({ router, method, path, command, cwd }) {
    router[method.toLowerCase()](path, (req, res) => {
        const options = { cwd };
        runCommand(command, options);
        res.json({ path, requestReceivedAt: Date.now() });
    });
}
