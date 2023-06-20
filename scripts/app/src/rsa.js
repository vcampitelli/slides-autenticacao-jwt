import chalk from 'chalk';
import {jwtVerify, importPKCS8, importSPKI, createLocalJWKSet} from 'jose';
import {readFile} from 'fs';
import signJwt from './sign.js';

const ALGORITHM = 'RS256';

export function ask(rl, callback) {
    rl.question(chalk.cyan('Qual o JWT a ser validado? '), async function(jwt) {
        jwt = jwt.trim();
        if (!jwt) {
            console.error(chalk.red('JWT inválido'));
            ask(rl, callback);
            return;
        }

        await callback(jwt);
        rl.close();
    });
}

export function verifyWithPublicKey(jwt, publicKeyPath, issuer, audience) {
    return new Promise((resolve, reject) => {
        readFile(publicKeyPath, {encoding: 'utf-8'}, (err, publicKey) => {
            if (err) {
                reject(err);
                return;
            }

            importSPKI(publicKey, ALGORITHM)
                .then((publicKey) => jwtVerify(jwt, publicKey, {
                    algorithms: [ALGORITHM],
                    issuer: issuer,
                    audience: audience,
                }).then(resolve).catch(reject));
        });
    });
}

export function verifyWithJwks(jwt, jwksPath, issuer, audience) {
    return new Promise((resolve, reject) => {
        readFile(jwksPath, {encoding: 'utf-8'}, (err, jwksContents) => {
            if (err) {
                reject(err);
                return;
            }

            const jwks = createLocalJWKSet(JSON.parse(jwksContents));

            jwtVerify(jwt, jwks, {
                algorithms: [ALGORITHM],
                issuer: issuer,
                audience: audience,
            }).then(resolve).catch(reject);
        });
    });
}

export function sign(privateKeyPath, subject, issuer, audience) {
    return new Promise((resolve, reject) => {
        readFile(privateKeyPath, {encoding: 'utf-8'}, (err, privateKeyContents) => {
            if (err) {
                reject(err);
                return;
            }
            importPKCS8(privateKeyContents, ALGORITHM).then((privateKey) => {
                const jwt = signJwt(
                    privateKey,
                    ALGORITHM,
                    subject,
                    issuer,
                    audience,
                );
                resolve(jwt);
            }).catch(reject);
        });
    });
};
