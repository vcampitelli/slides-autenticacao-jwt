import {EncryptJWT, importPKCS8, jwtDecrypt} from 'jose';

import {readFile} from 'fs';

const CONTENT_ENCRYPTION_ALGORITHM = 'A256GCM';
const KEY_MANAGEMENT_ALGORITHM = 'ECDH-ES+A256KW';

function doEncrypt(alg, secret, subject, issuer, audience) {
    return new EncryptJWT({})
        .setProtectedHeader({alg, enc: CONTENT_ENCRYPTION_ALGORITHM})
        .setIssuedAt()
        .setSubject(subject)
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime('2h')
        .encrypt(secret);
}

export function jweDirEncrypt(secret, subject, issuer, audience) {
    return doEncrypt('dir', secret, subject, issuer, audience);
}

/**
 *
 * @param privateKeyPath
 * @param privateKeyAlgo
 * @returns {Promise<Uint8Array>}
 */
const readPrivateKey = (privateKeyPath, privateKeyAlgo) => {
    return new Promise((resolve, reject) => {
        readFile(privateKeyPath, {encoding: 'utf-8'}, (err, privateKeyContents) => {
            if (err) {
                reject(err);
                return;
            }
            importPKCS8(privateKeyContents, privateKeyAlgo).then(resolve).catch(reject);
        });
    });
};

export function jweEncrypt(privateKeyPath, privateKeyAlgo, subject, issuer, audience) {
    return new Promise((resolve, reject) => {
        readPrivateKey(privateKeyPath, privateKeyAlgo).then((privateKey) => {
            doEncrypt(KEY_MANAGEMENT_ALGORITHM, privateKey, subject, issuer, audience).then(resolve).catch(reject);
        }).catch(reject);
    });
}

export function jweVerify(jwe, privateKeyPath, privateKeyAlgo, issuer, audience) {
    return new Promise((resolve, reject) => {
        readPrivateKey(privateKeyPath, privateKeyAlgo).then((privateKey) => {
            jwtDecrypt(jwe, privateKey, {
                keyManagementAlgorithms: [KEY_MANAGEMENT_ALGORITHM],
                contentEncryptionAlgorithms: [CONTENT_ENCRYPTION_ALGORITHM],
                issuer,
                audience,
            }).then(resolve).catch(reject);
        }).catch(reject);
    });
}
