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
        args: ['/s', '/c', `"${command}"`],
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
