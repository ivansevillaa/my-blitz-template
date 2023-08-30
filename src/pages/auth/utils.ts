import { generateToken, hash256 } from "@blitzjs/auth";
import { addHours } from "date-fns";
import db, { TokenType } from "db";
import VerifyEmail from "mailers/react-email/emails/Verify";
import { sendEmail } from "mailers/sendEmail";
import React from "react";

import { BASE_URL } from "src/core/constants/global";

import { GenerateTokenParams, SendVerifyEmailParams } from "./types";

const EMAIL_VERIFY_LINK_IN_HOURS = 4;

async function createToken({
  userId,
  userEmail,
  tokenType,
}: GenerateTokenParams) {
  const token = generateToken();
  const hashedToken = hash256(token);
  const expiresAt = addHours(new Date(), EMAIL_VERIFY_LINK_IN_HOURS);

  await db.token.create({
    data: {
      user: { connect: { id: userId } },
      type: tokenType,
      expiresAt,
      hashedToken,
      sentTo: userEmail,
    },
  });

  return token;
}

async function regenerateToken({
  userId,
  userEmail,
  tokenType,
}: GenerateTokenParams) {
  await db.token.deleteMany({ where: { type: tokenType, userId } });
  const token = await createToken({ userId, userEmail, tokenType });
  return token;
}

export async function getEmailVerifyLink({
  userId,
  userEmail,
}: SendVerifyEmailParams) {
  const token = await regenerateToken({
    userId,
    userEmail,
    tokenType: TokenType.VERIFY_EMAIL,
  });
  const link = `${BASE_URL}/auth/verify-email?token=${token}`;
  return link;
}

export async function sendVerificationEmail({
  userId,
  userEmail,
}: SendVerifyEmailParams) {
  const confirmEmailLink = await getEmailVerifyLink({
    userId,
    userEmail,
  });

  await sendEmail({
    to: userEmail,
    subject: "Verify your email address",
    react: React.createElement(VerifyEmail, {
      verifyEmailUrl: confirmEmailLink,
    }),
  });
}
