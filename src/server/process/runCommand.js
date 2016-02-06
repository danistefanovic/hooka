import { spawn } from 'child_process';
import normalizeArgs from './normalizeArgs';

export default function runCommand(command, options, logger) {
    const { file, args, defaultOptions } = normalizeArgs(command);
    const child = spawn(file, args, { ...defaultOptions, ...options });

    return new Promise((resolve, reject) => {
        child.stdout.on('data', handleStdout.bind(null, logger));
        child.stderr.on('data', handleStderr.bind(null, logger));
        child.on('close', handleClose.bind(null, logger, resolve, reject));
    });
}

function handleStdout(logger, data) {
    logger.log(data);
}

function handleStderr(logger, data) {
    logger.logError(data);
}

function handleClose(logger, resolve, reject, exitCode) {
    logger.logExit(exitCode);
    return (exitCode === 0) ? resolve() : reject(exitCode);
}
