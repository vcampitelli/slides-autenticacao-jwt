import chalk from 'chalk';
import {ask, verifyWithJwks} from './src/rsa.js';
import __dirname from './src/dirname.js';
import {createInterface} from 'node:readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

ask(rl, function(jwt) {
    process.stdout.write(chalk.blue('Validando JWT com JWKS... '));
    verifyWithJwks(
        jwt,
        __dirname + '/data/02-jwks.json',
        process.env.JWT_ISSUER,
        process.env.JWT_AUDIENCE,
    ).then((result) => {
        process.stdout.write(chalk.green('OK'));
        console.log();
        console.log(result);
    }).catch((err) => {
        process.stderr.write(chalk.red(' Erro'));
        console.error();
        console.error(err);
    });
});
