import { DocumentScope } from "nano";
import { __version } from "./schemas/version";
import { users } from "./schemas/designs/users";

export const initialize = (database: DocumentScope<any>) =>
  Promise.all([database.insert(__version), database.insert(users)]);
