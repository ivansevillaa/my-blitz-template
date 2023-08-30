import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import WelcomeEmail from "mailers/react-email/emails/Welcome";
import { sendEmail } from "mailers/sendEmail";
import React from "react";
import { Role } from "types";

import { getEmailVerifyLink } from "../../utils";
import { SignupInput } from "../types";

export default resolver.pipe(
  resolver.zod(SignupInput),
  async ({ email, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim());
    const user = await db.user.create({
      data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
      select: { id: true, name: true, email: true, role: true },
    });

    const confirmEmailLink = await getEmailVerifyLink({
      userId: user.id,
      userEmail: user.email,
    });

    await sendEmail({
      to: user.email,
      subject: "Welcome!!",
      react: React.createElement(WelcomeEmail, {
        verifyEmailUrl: confirmEmailLink,
      }),
    });

    await ctx.session.$create({ userId: user.id, role: user.role as Role });
    return user;
  }
);
