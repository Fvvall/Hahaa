import { object, string } from "zod";

export const UserRequest = object({
  email: string().email(),
  token: string(),
});
