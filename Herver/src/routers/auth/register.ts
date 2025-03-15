import { zValidator } from "@hono/zod-validator";
import { randomUUID } from "crypto";
import { RegisterRequest, RegisterResponse } from "hchema";
import { Hono } from "hono";

import { hashPassword } from "../../utils/hashPassword";
import { database } from "../../databases/database";
import { UserDocument } from "../../databases/schemas/user";

export const register = new Hono().post(
  "/",
  zValidator("json", RegisterRequest),
  async (ctx) => {
    try {
      const { email, password } = ctx.req.valid("json");

      if ((await database.find({ selector: { email } })).docs.length > 0) {
        const res: RegisterResponse = {
          code: 1,
          reason: "User already exists",
        };

        return ctx.json(res);
      }

      const user = await UserDocument.parseAsync({
        _id: randomUUID(),
        type: "user",
        email,
        password: hashPassword(password),
        groups: [],
        tokens: {},
      } satisfies UserDocument);

      await database.insert(user);

      const res: RegisterResponse = {
        code: 0,
      };

      return ctx.json(res);
    } catch (e) {
      const res: RegisterResponse = {
        code: 2,
        reason: String(e),
      };

      return ctx.json(res);
    }
  },
);
