import { resolver } from "@blitzjs/rpc";
import db, { TokenType } from "db";
import ChangePasswordEmail from "mailers/react-email/emails/ChangePassword";
import { sendEmail } from "mailers/sendEmail";
import React from "react";

import { BASE_URL } from "src/core/constants/global";

import { regenerateToken } from "../../utils";
import { ForgotPasswordInput } from "../types";

export default resolver.pipe(
  resolver.zod(ForgotPasswordInput),
  async ({ email }) => {
    const user = await db.user.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // If no user found wait the same time so attackers can't tell the difference
      await new Promise((resolve) => setTimeout(resolve, 750));
      return;
    }

    const possibleToken = await regenerateToken({
      userId: user.id,
      userEmail: user.email,
      tokenType: TokenType.RESET_PASSWORD,
    });

    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      react: React.createElement(ChangePasswordEmail, {
        changePasswordUrl: `${BASE_URL}/auth/reset-password?token=${possibleToken}`,
      }),
    });

    return;
  }
);
