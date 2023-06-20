import chalk from 'chalk';
import {createInterface} from 'node:readline';
import __dirname from './src/dirname.js';
import {sign} from './src/rsa.js';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ask = () => {
    rl.question(chalk.cyan('Qual o email (subject)? '), function (subject) {
        subject = subject.trim();
        if (!subject) {
            console.error(chalk.red('Subject inválido'));
            ask();
            return;
        }

        process.stdout.write(chalk.blue('Criando JWT... '));
        sign(
            __dirname + '/data/02-jws-rsa.key',
            subject,
            process.env.JWT_ISSUER,
            process.env.JWT_AUDIENCE
        ).then((jwt) => {
            process.stdout.write(chalk.green(' OK'));
            console.log();
            console.log(jwt);
            console.log();
        }).catch((err) => {
            process.stderr.write(chalk.red(' Erro'));
            console.error();
            console.error(err);
        });
        rl.close();
    });
};

ask();
