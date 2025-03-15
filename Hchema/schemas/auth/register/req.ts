import { object, string, z } from "zod";

export const RegisterRequest = object({
  email: string().email(),
  password: string(),
});

export type RegisterRequest = z.infer<typeof RegisterRequest>;
