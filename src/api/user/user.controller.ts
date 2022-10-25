import { Request, Response } from 'express';
import config from 'config';
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from './user.schema';
import sendEmail from '../../utils/mailer';
import { createUser, findUserByEmail, findUserById } from './user.service';
import { nanoid } from 'nanoid';

// Create New User Handler
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createUser(body);
    await sendEmail({
      from: config.get('smtp.auth.user'),
      to: user.email,
      subject: 'Please verify your account',
      text: `ID: ${user._id} Verification code: ${user.verificationCode}`,
      html: `
          <h1>ID:</h1>
          <p>${user._id}</p>
          <h1>Verification code:</h1>
          <p>${user.verificationCode}</p>
        `,
    });
    return res.send('User successfully created');
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Account already exists');
    }
    return res.status(500).send(e);
  }
}
// Verify User Account Handler
export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const { id, verificationCode } = req.params;
  const user = await findUserById(id);

  if (!user) {
    return res.send('Could not verify user');
  }
  if (user.verified) {
    return res.send('User already verified');
  }
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();
    return res.send('User successfully verified');
  }
  return res.send('Could not verify user');
}
// Forgot Password Handler
export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  const message = 'If user registred will recieve password reset email';

  if (!user) {
    return res.send(message);
  }
  if (!user.verified) {
    return res.send('User not verified');
  }
  user.passwordRestCode = nanoid();
  await user.save();
  await sendEmail({
    from: config.get('smtp.auth.user'),
    to: user.email,
    subject: 'Password Reset Code',
    text: `ID: ${user._id} Password reset code: ${user.passwordRestCode}`,
    html: `
        <h1>ID:</h1>
        <p>${user._id}</p>
        <h1>Password reset code:</h1>
        <p>${user.passwordRestCode}</p>
      `,
  });
  return res.send(message);
}
// Reset Password Handler
export async function resetPasswordHandler(
  req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
  res: Response
) {
  const { id, passwordRestCode } = req.params;
  const { password } = req.body;
  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordRestCode ||
    user.passwordRestCode !== passwordRestCode
  ) {
    return res.status(400).send('Could not reset user password');
  }
  user.passwordRestCode = null;
  user.password = password;
  await user.save();
  return res.send('Successfully update password');
}
