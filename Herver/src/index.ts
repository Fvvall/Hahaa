import "dotenv/config";

import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "@intzaaa/logger";

export const config = (await import("./config")).default;

export const log = logger(config.logLevel, "Herver");
log("INFO", ["Starting Herver..."]);

export const app = async () => {
  const { login } = await import("./routers/auth/login");
  const { register } = await import("./routers/auth/register");

  return new Hono()
    .use(cors())
    .route("/auth/login", login)
    .route("/auth/register", register);
};

app();

export type ServerType = Awaited<ReturnType<typeof app>>;
