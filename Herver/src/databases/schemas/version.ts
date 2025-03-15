import { zod } from "hchema";
import { createDocumentSchema } from "../utils";
import { config } from "../..";

export const Version = createDocumentSchema(
  "version",
  zod.object({
    _id: zod.literal("version"),
    data: zod.number().min(0),
  }),
);

export type VersionDocument = zod.infer<typeof Version>;

export const __version: VersionDocument = Version.parse({
  _id: "version",
  type: "version",
  data: config.version,
});
