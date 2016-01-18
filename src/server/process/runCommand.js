import { spawn } from 'child_process';
import logPrinter from '../logPrinter';
import normalizeArgs from './normalizeArgs';

export default function runCommand(command, options) {
    const id = Date.now();
    const { file, args, defaultOptions } = normalizeArgs(command);
    const child = spawn(file, args, { ...defaultOptions, ...options });
    const logger = logPrinter.create(id);
    logger.logStart(command);

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
