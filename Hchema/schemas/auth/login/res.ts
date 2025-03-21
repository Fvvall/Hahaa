import { object, string, z } from "zod";
import { withCode } from "../../code";

export const LoginResponse = withCode(
  object({
    token: string().uuid(),
  })
);

export type LoginResponse = z.infer<typeof LoginResponse>;
