import { z, object, string } from "zod";
import { ErrorObject } from "../code";

export const User = object({
  id: string().uuid(),
  email: string().email(),
}).or(ErrorObject);

export type User = z.infer<typeof User>;
