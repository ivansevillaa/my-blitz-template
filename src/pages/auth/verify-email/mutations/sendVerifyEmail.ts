import { resolver } from "@blitzjs/rpc";
import db from "db";

import { sendVerificationEmail } from "../../utils";

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  const user = await db.user.findFirst({
    where: { id: ctx.session.userId },
  });

  if (!user) throw new Error("User not found");

  await sendVerificationEmail({
    userId: user.id,
    userEmail: user.email,
  });
});
