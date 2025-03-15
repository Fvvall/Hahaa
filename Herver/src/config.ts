import { LogLevel } from "@intzaaa/logger";
import { version } from "../meta.json" with { type: "json" };

export default {
  version,
  logLevel: (process.env["LOG_LEVEL"] || "INFO") as LogLevel,
  port: process.env["PORT"] || 3000,
  database: {
    name: process.env["DATABASE_NAME"] || "herver",
    url: process.env["DATABASE_URL"] || "http://localhost:5984",
    username: process.env["DATABASE_USER"] || "admin",
    password: process.env["DATABASE_PASSWORD"] || "admin",
  },
  user: {
    maxTokens: parseInt(process.env["USER_MAX_TOKENS"] || "5"),
    tokenMaxAge: parseInt(process.env["USER_TOKEN_MAX_AGE"] || "34560000"),
  },
};
