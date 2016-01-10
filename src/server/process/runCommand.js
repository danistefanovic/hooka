import { spawn } from 'child_process';
import normalizeArgs from './normalizeArgs';

export default function runCommand(command) {
    const id = Date.now();
    const { file, args, options } = normalizeArgs(command);
    const child = spawn(file, args, options);

    return new Promise((resolve, reject) => {
        child.stdout.on('data', handleStdout.bind(null, id));
        child.stderr.on('data', handleStderr.bind(null, id));
        child.on('close', handleClose.bind(null, id, resolve, reject));
    });
}

function handleStdout(id, data) {
    console.log(`${id} stdout: ${data}`); // eslint-disable-line no-console
}

function handleStderr(id, data) {
    console.log(`${id} stderr: ${data}`); // eslint-disable-line no-console
}

function handleClose(id, resolve, reject, exitCode) {
    console.log(`${id} Exit code: ${exitCode}`); // eslint-disable-line no-console
    return (exitCode === 0) ? resolve() : reject(exitCode);
}
