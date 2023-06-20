import chalk from 'chalk';
import {hmacSign} from './src/hmac.js';
import {createInterface} from 'node:readline';

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
        hmacSign(
            process.env.JWT_HMAC_SECRET,
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
        });
    });
};

ask();
