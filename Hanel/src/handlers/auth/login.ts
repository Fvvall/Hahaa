import { client } from "../../utils/client";
import { UserStore } from "../../stores/user";
import { fail, Maybe, succeed } from "@intzaaa/maybe";

export const login = async (
  email: string,
  password: string,
): Promise<Maybe> => {
  try {
    const res = await client.auth.login.$get({
      query: {
        email,
        password,
      },
    });

    const json = await res.json();

    if (json.code !== 0) {
      return fail(json);
    }

    UserStore.update(() => ({
      token: json.token,
      email,
    }));

    return succeed();
  } catch (e) {
    return fail(e);
  }
};
