import nano from "nano";
import { config, log } from "..";
import { DatabaseDocument } from "./utils";
import { VersionDocument } from "./schemas/version";
import { migrate } from "./migrations/migrate";
import { initialize } from "./initialize";

const databases = nano({ url: config.database.url, log: console.log });

{
  const auth = await databases.auth(
    config.database.username,
    config.database.password,
  );

  if (auth.ok) log("INFO", ["Connected to the databases."]);
  else log("FATAL", ["Failed to connect to the databases."]);
}

const database = databases.use<DatabaseDocument>(config.database.name);

{
  const version = (
    (await database.get("version")) as VersionDocument | undefined
  )?.data;

  if (version === undefined) {
    log("INFO", ["Database is empty.", "Initializing..."]);
    await initialize(database);
  } else {
    if (version < config.version) {
      log("INFO", ["Database is outdated.", "Migrating..."]);
      migrate(database, version);
    } else {
      log("INFO", ["Database is up to date."]);
    }
  }
}

export { database };
