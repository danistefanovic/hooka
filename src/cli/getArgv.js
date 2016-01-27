import yargs from 'yargs';
import pkg from '../../package.json';

export default function getArgv() {
    return yargs
        .usage('Usage: $0 [options]')
        .help('help').alias('help', 'h')
        .version(pkg.version).alias('version', 'v')
        .implies('tls-key', 'tls-cert')
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
            'tls-key': {
                description: 'Path to private key'
            },
            'tls-cert': {
                description: 'Path to certificate'
            },
        })
        .argv;
};
