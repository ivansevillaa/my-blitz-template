import { resolver } from "@blitzjs/rpc";
import db from "db";

import { UserProfileInput } from "../types";

export default resolver.pipe(
  resolver.zod(UserProfileInput),
  resolver.authorize(),
  async ({ name, username, bio }, ctx) => {
    return db.user.update({
      where: {
        id: ctx.session.userId,
      },
      data: {
        name,
        username,
        bio,
      },
    });
  }
);
