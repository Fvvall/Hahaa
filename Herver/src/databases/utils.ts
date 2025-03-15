import { zod } from "hchema";
import { UserDocument } from "./schemas/user";
import { VersionDocument } from "./schemas/version";
import nano from "nano";

export type DatabaseDocument = UserDocument | VersionDocument;

export const withRev = <T extends zod.ZodObject<any>>(schema: T) =>
  zod.intersection(
    zod
      .object({
        _rev: zod.string(),
      })
      .or(zod.object({})),
    schema,
  );

export const createDocumentSchema = <
  T extends string,
  S extends zod.ZodObject<any>,
>(
  type: T,
  schema: S,
) => {
  return zod.intersection(
    zod.object({
      type: zod.literal(type),
    }),
    withRev(schema),
  );
};

export type DesignDocument = Parameters<
  nano.DocumentScope<DatabaseDocument>["insert"]
>[0] & {
  _id: `_design/${string}`;
};
