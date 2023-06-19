import chalk from 'chalk';
import {jweVerify} from './src/jwe.js';
import {createInterface} from 'node:readline';
import __dirname from './src/dirname.js';


import {importJWK} from 'jose';
import {createECDH, diffieHellman, createPrivateKey} from 'node:crypto';
import {readFileSync} from 'node:fs';

if (true) {
const jwt = 'eyJhbGciOiJFQ0RILUVTK0EyNTZLVyIsImVuYyI6IkEyNTZHQ00iLCJlcGsiOnsieCI6ImhFRnU2MUtvUENweUxoY2czRnc2X0JQby11MFZHbWMwUWVLSVFyREtNb2MiLCJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieSI6IlFpcmpEUHFjc1FpM1laYXFRSUZGcHd1N1dSLUVzT1lNVVgwNkxkb2wtdnMifX0.VzId74KaDtsUv29Wu4mjEpi1RxXH4t_afyx7F-UGQj6VOhEmhAXfmw.j5epHIRHcdw69FFm.RnRg4EKDyJBpCARR27P_jfLhZvgEFDWZbc6WVYTO5GBnraTCsyT0k5gmtDU7tMObyg.4Z1Z-NnlcUvBnXTJoWWY0g';
const parts = jwt.split('.').map((part) => Buffer.from(part, 'base64url').toString('utf-8'));
console.log(parts)
const [protectedHeaderString, encryptedKey, iv, ciphertext, tag] = parts;
const protectedHeader = JSON.parse(protectedHeaderString);
importJWK(protectedHeader.epk, 'ECDH-ES+A256KW').then(publicKey => {
    const decryptor = createECDH('prime256v1');
    const privateKey = readFileSync(__dirname + '/data/03-jwe-ec.pem', {encoding: 'utf-8'});
    const sharedSecret = diffieHellman({
        publicKey: publicKey,
        privateKey: createPrivateKey(privateKey),
    });
    console.log(sharedSecret)
});
} else {
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
}
