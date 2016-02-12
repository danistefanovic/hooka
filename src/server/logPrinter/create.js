import colorGenerator from './colorGenerator';
import { error } from './colors';

const colors = colorGenerator();

/**
 * Creates the log printer
 * @param {string} id
 * @return {Object} log printer
 */
export default function create(id) {
    const color = colors.next().value;

    return {
        log: log.bind(null, color, id),
        logError: logError.bind(null, color, id),
        logStart: logStart.bind(null, color, id),
        logExit: logExit.bind(null, color, id)
    };
}

function log(color, id, message) {
    write(color(`${id} | `) + message);
}

function logError(color, id, message) {
    write(color(`${id} | `) + error(message));
}

function logStart(color, id, method, path) {
    write(color(`${id} ${method.toUpperCase()} ${path}`));
}

function logExit(color, id, exitCode) {
    write(color(`${id} exited with code ${exitCode}`));
}

function write(text) {
    console.log(text.trim()); // eslint-disable-line no-console
}
