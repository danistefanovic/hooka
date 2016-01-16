import { spawn } from 'child_process';
import path from 'path';
import pkg from '../../package.json';

const testFolder = path.join(__dirname, '../');

export default function cli(args = [], cwd = testFolder) {
    const bin = path.join(__dirname, '../..', pkg.bin);

    return spawn('node', [bin].concat(args), {
        cwd: cwd,
        stdio: ['pipe']
    });
}
