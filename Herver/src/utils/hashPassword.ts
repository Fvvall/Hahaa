import { createHash } from "node:crypto";

export const hashPassword = (password: string): string =>
  createHash("sha256").update(password).digest("base64");
