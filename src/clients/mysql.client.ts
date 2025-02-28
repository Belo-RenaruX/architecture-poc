import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import { UserTable } from "../schemas/user.schema";

export interface Database {
  User: UserTable,
}

const dialect = new MysqlDialect({
  pool: createPool({
    host: "bohemia-padel-db-dev.c9wi4eqgchj1.us-east-1.rds.amazonaws.com",
    user: "devuser",
    password:"edYhouwPYWI6Xb7bju1dz01t",
    database: "architecture_test",
    port: 3306,
    connectionLimit: 10,
  }),
});

export const db = new Kysely<Database>({ dialect });