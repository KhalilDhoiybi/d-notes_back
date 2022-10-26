import { NextFunction, Request, Response } from 'express';
import { signJwt, verifyJwt } from '../utils/jwt';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    return next();
  }
  // Valid Access Token
  const { payload, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');
  if (payload) {
    res.locals.user = payload;
    return next();
  }
  // Expired But Valid Access Token
  const { payload: refreshPayload } =
    expired && refreshToken
      ? verifyJwt(refreshToken, 'refreshTokenPublicKey')
      : { payload: null };
  if (!refreshPayload) {
    return next();
  }
  // Verify Session
  // const session = getSession(refresh.sessionId); // TODO getSession service

  // if (!session) {
  //   return next();
  // }
  const session = { _id: 'testsessionid' };
  const newAccessToken = signJwt(session, 'accessTokenPrivateKey', '15m');

  res.cookie('accessToken', newAccessToken, {
    maxAge: 900000, // 15 minutes
    httpOnly: true,
  });
  res.locals.user = verifyJwt(newAccessToken, 'accessTokenPublicKey').payload;
  return next();
};

export default deserializeUser;
