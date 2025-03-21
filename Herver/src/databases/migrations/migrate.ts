import { DocumentScope } from "nano";

const migrations: ((database: DocumentScope<any>) => void)[] = [];

export const migrate = async (database: DocumentScope<any>, from: number) =>
  migrations.slice(from).forEach((migration) => migration(database));
