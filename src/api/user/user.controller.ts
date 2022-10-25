import { Request, Response } from 'express';
import config from 'config';
import { CreateUserInput, VerifyUserInput } from './user.schema';
import sendEmail from '../../utils/mailer';
import { createUser, findUserById } from './user.service';

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
      text: `Verification code: ${user.verificationCode} ID: ${user._id}`,
      html: `
          <h1>Verification code:</h1>
          <p>${user.verificationCode}</p>
          <h1>ID:</h1>
          <p>${user._id}</p>
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
