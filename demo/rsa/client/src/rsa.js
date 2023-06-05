import {jwtVerify, importSPKI, createLocalJWKSet} from 'jose';
import {readFile} from 'fs';

const ALGORITHM = 'RS256';

const encodeSecret = (secret) => new TextEncoder().encode(secret);

export function verifyWithPublicKey(jwt, publicKeyPath, subject, issuer, audience) {
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
                    subject: subject,
                }).then(resolve).catch(reject));
        });
    });
}

export function verifyWithJwks(jwt, jwksPath, subject, issuer, audience) {
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
                subject: subject,
            }).then(resolve).catch(reject);
        });
    });
}
