import {SignJWT} from 'jose';

export default (secret, alg, subject, issuer, audience) => new SignJWT({})
    .setProtectedHeader({alg})
    .setIssuedAt()
    .setSubject(subject)
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('2h')
    .sign(secret);
