import { intersection, literal, object, string, ZodObject } from "zod";

export const ErrorObject = object({
  code: literal(1).or(literal(2)).or(literal(3)).or(literal(4)).or(literal(5)).or(literal(6)).or(literal(7)).or(literal(8)).or(literal(9)),
  reason: string().nullable(),
});

export const SuccessObject = object({
  code: literal(0),
});

export const withCode = <T extends ZodObject<any>>(schema: T) => intersection(SuccessObject, schema).or(ErrorObject);
