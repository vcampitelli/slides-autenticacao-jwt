import chalk from 'chalk';
import {hmacSign, hmacVerify} from './src/hmac.js';

const SECRET = '75d8e6764eb16569900f080d571217bb7f10ad58c67927d9fae4cf2cf7117254';
const ISSUER = 'viniciuscampitelli.com';
const AUDIENCE = 'confloss2023';

const subject = 'teste@teste.com';

process.stdout.write(chalk.blue('Criando JWT... '));
hmacSign(SECRET, subject, ISSUER, AUDIENCE).then((jwt) => {
    process.stdout.write(chalk.green(' OK'));
    console.log();
    console.log(jwt);
    console.log();

    process.stdout.write(chalk.blue('Validando JWT... '));
    hmacVerify(jwt, SECRET, ISSUER, AUDIENCE).then((result) => {
        process.stdout.write(chalk.green('OK'));
        console.log();
        console.log(result);
    }).catch((err) => {
        process.stderr.write(chalk.red('Erro'));
        console.error();
        console.error(err);
    });
}).catch((err) => {
    process.stderr.write(chalk.red('Erro'));
    console.error();
    console.error(err);
});
