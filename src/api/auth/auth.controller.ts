import { Request, Response } from 'express';
import config from 'config';
import { omit } from 'lodash';
import { privateFields } from '../user/user.model';
import { findUserByEmail } from '../user/user.service';
import { CreateSessionInput } from './auth.schema';
import { signAccessToken, signRefreshToken } from './auth.service';

// CreateSession/Login Handler
export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const { email, password } = req.body;
  const message = 'Invalid email or password';
  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }
  if (!user.verified) {
    return res.send('Please verify your email');
  }
  const isValid = await user.validatePassword(password);
  if (!isValid) {
    return res.send(message);
  }
  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken(
    user._id,
    req.get('user-agent') || ''
  );
  res.cookie('accessToken', accessToken, {
    maxAge: 900000, // 15mn
    httpOnly: true,
    domain: config.get<string>('domain'),
    path: '/',
    sameSite: 'strict',
    secure: false,
  });
  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, // 1y
    httpOnly: true,
    domain: config.get<string>('domain'),
    path: '/',
    sameSite: 'strict',
    secure: false,
  });
  return res.send(omit(user.toJSON(), privateFields));
}
