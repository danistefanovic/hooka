import { spawn } from 'child_process';
import _ from 'lodash';
import untildify from 'untildify';
import normalizeArgs from './normalizeArgs';

/**
 * Starts a child process
 * @param {string} command The command to run
 * @param {Object} options See https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 * @param {Object} logger The log printer
 * @return {Promise}
 */
export default function runCommand(command, options, logger) {
    const { file, args, defaultOptions } = normalizeArgs(command);
    const child = spawn(file, args, {
        ...defaultOptions,
        ...options,
        cwd: _.get(options, 'cwd') ? untildify(options.cwd) : undefined
    });

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
