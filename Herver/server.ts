import { app } from "./src";
import { serve } from "@hono/node-server";

serve(await app());
