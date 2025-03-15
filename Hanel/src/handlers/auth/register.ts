import { fail, Maybe, succeed } from "@intzaaa/maybe";
import { client } from "../../utils/client";

export const register = (async (email: string, password: string) => {
  try {
    const res = await client.auth.register.$post({
      json: {
        email,
        password,
      },
    });

    const json = await res.json();

    if (json.code === 0) {
      return succeed();
    } else {
      return fail(json);
    }
  } catch (e) {
    return fail(e);
  }
}) satisfies (...any: any) => Promise<Maybe<any>>;
