import jwt from 'jsonwebtoken';
import config from 'config';

// Sign Access Or Refresh Token
export function signJwt(
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  expiresIn: string | number
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, signingKey, { expiresIn, algorithm: 'RS256' });
}
// Verify Access Or Refresh
export function verifyJwt(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString(
    'ascii'
  );
  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (e: any) {
    return { payload: null, expired: e.message.includes('jwt expired') };
  }
}
