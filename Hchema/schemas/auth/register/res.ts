import { literal, object, z } from "zod";
import { withCode } from "../../code";

export const RegisterResponse = withCode(
  object({
    code: literal(0),
  })
);

export type RegisterResponse = z.infer<typeof RegisterResponse>;
