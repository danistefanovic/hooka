import yargs from 'yargs';
import pkg from '../../package.json';

export default function getArgv() {
    return yargs
        .usage('Usage: $0 <command> [options]')
        .help('help').alias('help', 'h')
        .version(pkg.version).alias('version', 'v')
        .options({
            config: {
                alias: 'c',
                default: 'webhooks.json',
                demand: true,
                description: 'Set webhook JSON file'
            },
            port: {
                alias: 'p',
                default: 3000,
                demand: true,
                description: 'Set port'
            },
            secret: {
                alias: 's',
                default: false,
                description: 'Set secret token'
            }
        })
        .argv;
};
