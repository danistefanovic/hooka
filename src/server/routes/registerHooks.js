import runCommand from '../process/runCommand';
import areObjectValuesDefined from '../utils/areObjectValuesDefined';
import pickVariablesFromJson from '../utils/pickVariablesFromJson';
import validateHook from '../utils/validateHook';

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

function addRoute({ router, method, path, command, cwd, parseJson }) {
    router[method.toLowerCase()](path, (req, res) => {
        const env = pickVariablesFromJson(req.body, parseJson);

        if (parseJson && !areObjectValuesDefined(env)) {
            return res.status(400).send('JSON path does not match');
        }

        const options = { cwd, env };
        runCommand(command, options);
        res.json({ path, requestReceivedAt: Date.now() });
    });
}
