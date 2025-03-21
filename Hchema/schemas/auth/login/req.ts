import { object, string, z } from "zod";

export const LoginRequest = object({
  email: string().email(),
  password: string(),
});

export type AuthRequest = z.infer<typeof LoginRequest>;
