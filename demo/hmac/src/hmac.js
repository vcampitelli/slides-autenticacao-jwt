import {jwtVerify, SignJWT} from 'jose';

const ALGORITHM = 'HS256';

const encodeSecret = (secret) => new TextEncoder().encode(secret);

export function hmacSign(secret, subject, issuer, audience) {
    return new SignJWT({})
        .setProtectedHeader({alg: ALGORITHM})
        .setIssuedAt()
        .setSubject(subject)
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime('2h')
        .sign(encodeSecret(secret));
}

export function hmacVerify(jwt, secret, issuer, audience) {
    return jwtVerify(jwt, encodeSecret(secret), {
        algorithms: [ALGORITHM],
        issuer: issuer,
        audience: audience,
    });
}
