/**
 * Prepares the command for child_process.spawn depending on the OS
 * @param {string} command The command
 * @return {Object} child_process.spawn options and args
 */
export default function normalizeArgs(command) {
    if (process.platform === 'win32') {
        return normalizeOnWindows(command);
    } else {
        return normalizeOnUnixLike(command);
    }
}

function normalizeOnWindows(command) {
    return {
        file: process.env.comspec || 'cmd.exe',
        args: ['/s', '/c', command],
        options: { windowsVerbatimArguments: true }
    };
}

function normalizeOnUnixLike(command) {
    return {
        file: '/bin/sh',
        args: ['-c', command],
        options: {}
    };
}
