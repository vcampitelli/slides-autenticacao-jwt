import chalk from 'chalk';
import {jweVerify} from './src/jwe.js';
import {createInterface} from 'node:readline';
import __dirname from './src/dirname.js';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ask = () => {
    rl.question(chalk.cyan('Qual o JWT a ser validado? '), function(jwt) {
        jwt = jwt.trim();
        if (!jwt) {
            console.error(chalk.red('JWT inválido'));
            ask(rl);
            return;
        }

        process.stdout.write(chalk.blue('Validando JWT... '));
        jweVerify(
            jwt,
            __dirname + '/data/03-jwe-ec.pem',
            'ec',
            process.env.JWT_ISSUER,
            process.env.JWT_AUDIENCE,
        ).then((result) => {
            process.stdout.write(chalk.green(' OK'));
            console.log();
            console.log(result);
        }).catch((err) => {
            process.stderr.write(chalk.red(' Erro'));
            console.error();
            console.error(err);
        }).finally(() => {
            rl.close();
        });
    });
};

ask();
