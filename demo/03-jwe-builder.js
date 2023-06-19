import chalk from 'chalk';
import {jweDirEncrypt, jweEncrypt} from './src/jwe.js';
import {createInterface} from 'node:readline';
import __dirname from './src/dirname.js';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ask = () => {
    rl.question(chalk.cyan('Qual o email (subject)? '), function(subject) {
        subject = subject.trim();
        if (!subject) {
            console.error(chalk.red('Subject inválido'));
            ask();
            return;
        }

        process.stdout.write(chalk.blue('Criando JWT... '));
        const jwt = jweEncrypt(
            __dirname + '/data/03-jwe-ec.pem',
            'ec',
            subject,
            process.env.JWT_ISSUER,
            process.env.JWT_AUDIENCE,
        ).then((jwt) => {
            process.stdout.write(chalk.green(' OK'));
            console.log();
            console.log(jwt);
        }).catch((err) => {
            process.stderr.write(chalk.red(' Erro'));
            console.error();
            console.error(err);
        }).finally(() => {
            rl.close();
            console.log('@TODO dir encryption');
        });
    });
};

ask();
