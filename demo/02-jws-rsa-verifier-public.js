import chalk from 'chalk';
import {ask, verifyWithPublicKey} from './src/rsa.js';
import {createInterface} from 'node:readline';
import __dirname from './src/dirname.js';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

ask(rl, function(jwt) {
    process.stdout.write(chalk.blue('Validando JWT com chave pública... '));
    verifyWithPublicKey(
        jwt,
        __dirname + '/data/jwt.pem',
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
