import { LocalStoragePreset } from "lowdb/browser";

export type User = {
  token: string;
  email: string;
};

export const UserStore = LocalStoragePreset<User | {}>("user", {});
