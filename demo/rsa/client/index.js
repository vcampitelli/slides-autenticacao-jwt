import chalk from 'chalk';
import path from 'path';
import {fileURLToPath} from 'url';
import {verifyWithPublicKey, verifyWithJwks} from './src/rsa.js';

const ISSUER = 'viniciuscampitelli.com';
const AUDIENCE = 'confloss2023';

const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODYwMDQ4MTIsIm5iZiI6MTY4NjAwNDgxMiwiZXhwIjoxNjg2MDA4NDEyLCJzdWIiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJpc3MiOiJ2aW5pY2l1c2NhbXBpdGVsbGkuY29tIiwiYXVkIjoiY29uZmxvc3MyMDIzIn0.AVjOLeQfKEGja-6yWhKzpuxzt37QVuLsUuoqy5h2y2AFUa5IhetaE7aYQBIL-UhxB4kuPvbv3zkLcpw06WPfdYYCs3dR_I35aIDRIqbXtby7-_1nfC8j-at38TBWibHdBpqchEI9iinwkTw7AF2UfP3g2lml7P6o6vsjzb-87fKQsSInZj-eKQuPlgDVmyCcRSW2Ki_lXZmfErwFGpWi0S4RWy92urt7HcqiEJV1_X44VkLHXdcTRHkYSxXxx6OXiKvQk0nAzkcvWMdrVVNLtxDm007FwGcjR63jilEWUVZYB_q7oMiyJnjJjklmUPLastLs-IxEfnb-edXfEe_I0w';
const subject = 'teste@teste.com';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.argv.includes('--jwks')) {
    process.stdout.write(chalk.blue('Validando JWT com JWKS... '));
    verifyWithJwks(jwt, __dirname + '/data/jwks.json', subject, ISSUER, AUDIENCE).then((result) => {
        process.stdout.write(chalk.green('OK'));
        console.log();
        console.log(result);
    }).catch((err) => {
        process.stderr.write(chalk.red('Erro'));
        console.error();
        console.error(err);
    });
} else {
    process.stdout.write(chalk.blue('Validando JWT com chave pública... '));
    verifyWithPublicKey(jwt, __dirname + '/data/jwt.pem', subject, ISSUER, AUDIENCE).then((result) => {
        process.stdout.write(chalk.green('OK'));
        console.log();
        console.log(result);
    }).catch((err) => {
        process.stderr.write(chalk.red('Erro'));
        console.error();
        console.error(err);
    });
}
