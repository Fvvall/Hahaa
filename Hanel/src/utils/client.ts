import { ServerType } from "herver";
import { hc } from "hono/client";
import { config } from "../config";

export const client = hc<ServerType>(config.server.baseUrl);
