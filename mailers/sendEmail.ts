import { render } from "@react-email/render";
import { Resend } from "resend";

import { isDev } from "src/core/utils/env";
import { env } from "src/env.mjs";

import { nodemailerAppTransport } from "./transports/nodemailerLocalTransport";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail({ to, subject, react }) {
  const message = {
    from: "onboarding@resend.dev",
    to,
    subject,
  };

  if (isDev()) {
    const html = render(react);
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    });
  } else {
    return resend.emails.send({
      ...message,
      react,
    });
  }
}
