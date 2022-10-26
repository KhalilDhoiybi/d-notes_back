import { DocumentType } from '@typegoose/typegoose';
import { get, omit } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { signJwt, verifyJwt } from '../../utils/jwt';
import { privateFields, User } from '../user/user.model';
import { findUserById } from '../user/user.service';
import SessionModel, { Session } from './session.model';

// Create Session
export async function createSession(userId: string, userAgent: string) {
  return SessionModel.create({ user: userId, userAgent });
}
// Find Session By Id
export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}
// UpdateSession
export async function updateSession(
  query: FilterQuery<Session>,
  update: UpdateQuery<Session>
) {
  return SessionModel.updateOne(query, update);
}
// Sign Access Token
export function signAccessToken(user: DocumentType<User>, sessionId: string) {
  const payload = omit(user.toJSON(), privateFields);
  const accessToken = signJwt(
    { ...payload, session: sessionId },
    'accessTokenPrivateKey',
    '15m'
  );
  return accessToken;
}
// Sign Refresh Token
export async function signRefreshToken(userId: string, userAgent: string) {
  const session = await createSession(userId, userAgent);
  const refreshToken = signJwt(
    { session: session._id },
    'refreshTokenPrivateKey',
    '1y'
  );
  return { refreshToken, sessionId: session._id };
}
// Refresh Access Token
export async function reIssueAccessToken(refrshToken: string) {
  const { payload } = verifyJwt(refrshToken, 'refreshTokenPublicKey');
  if (!payload || !get(payload, 'session')) return false;

  const session = await findSessionById(get(payload, 'session'));
  if (!session || !session.valid) return false;

  const user = await findUserById(String(session.user));
  if (!user) return false;

  const accessToken = signAccessToken(user, get(payload, 'session'));
  return accessToken;
}
