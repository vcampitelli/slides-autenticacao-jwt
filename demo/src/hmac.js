import {jwtVerify} from 'jose';
import sign from './sign.js';

const ALGORITHM = 'HS256';

const encodeSecret = (secret) => new TextEncoder().encode(secret);

export const hmacSign = (secret, subject, issuer, audience) => sign(
    encodeSecret(secret),
    ALGORITHM,
    subject,
    issuer,
    audience,
);

export function hmacVerify(jwt, secret, issuer, audience) {
    return jwtVerify(jwt, encodeSecret(secret), {
        algorithms: [ALGORITHM],
        issuer: issuer,
        audience: audience,
    });
}
