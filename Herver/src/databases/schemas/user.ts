import { zod as z } from "hchema";
import { createDocumentSchema } from "../utils";

export const UserDocument = createDocumentSchema(
  "user",
  z.object({
    _id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().describe("sha256 hashed"),
    groups: z.array(z.string()),
    tokens: z.record(
      z.object({
        // v0
        expires: z.number(),
        //
      }),
    ),
  }),
);

export type UserDocument = z.infer<typeof UserDocument>;

export const __user: UserDocument = {
  _id: "00000000-0000-0000-0000-000000000000",
  type: "user",
  email: "somebody@example.com",
  password: "password",
  groups: ["common"],
  tokens: {
    "00000000-0000-0000-0000-000000000000": {
      expires: 0,
    },
  },
};
