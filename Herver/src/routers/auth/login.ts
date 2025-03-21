import { zValidator } from "@hono/zod-validator";
import { LoginRequest, LoginResponse } from "hchema";
import { Hono } from "hono";
import { hashPassword } from "../../utils/hashPassword";
import { randomUUID } from "node:crypto";
import { setCookie } from "hono/cookie";
import { log } from "node:console";
import { database } from "../../databases/database";
import { UserDocument } from "../../databases/schemas/user";
import { config } from "../..";
import { users } from "../../databases/schemas/designs/users";

export const login = new Hono().get(
  "/",
  zValidator("query", LoginRequest),
  async (ctx) => {
    const { email, password } = ctx.req.valid("query");

    const view = await database.view(
      "users",
      "email-password" satisfies keyof (typeof users)["views"],
      {
        start_key: email,
        end_key: email,
        include_docs: true,
      },
    );

    const result = await UserDocument.safeParseAsync(view.rows[0]?.doc);

    if (!result.success) {
      const res: LoginResponse = {
        code: 1,
        reason: "User does not exist.",
      };

      log("ERROR", [result.error]);

      return ctx.json(res);
    }

    if (result.data.password !== hashPassword(password)) {
      const res: LoginResponse = {
        code: 2,
        reason: "Invalid password",
      };

      return ctx.json(res);
    }

    const token = randomUUID();
    const user = result.data;
    const expires = Math.round(Date.now() / 1000 + config.user.tokenMaxAge);

    user.tokens[token] = {
      expires,
    };

    await database.insert(
      await UserDocument.parseAsync(user satisfies UserDocument),
    );

    const res: LoginResponse = {
      code: 0,
      token,
    };

    setCookie(ctx, "token", token, {
      maxAge: config.user.tokenMaxAge,
      sameSite: "none",
      httpOnly: true,
    });

    return ctx.json(res);
  },
);
