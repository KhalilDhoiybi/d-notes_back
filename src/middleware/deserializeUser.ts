import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { reIssueAccessToken } from '../api/auth/auth.service';
import { verifyJwt } from '../utils/jwt';

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
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);
    if (newAccessToken) {
      res.cookie('accessToken', newAccessToken, {
        maxAge: 604800000, // 7d
        httpOnly: true,
        domain: config.get<string>('domain'),
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
    }
    res.locals.user = verifyJwt(
      newAccessToken as string,
      'accessTokenPublicKey'
    ).payload;
    return next();
  }

  return next();
};

export default deserializeUser;
