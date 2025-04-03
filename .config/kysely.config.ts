import { createPool } from 'mysql2';
import { defineConfig } from "kysely-ctl";
import { MysqlDialect } from 'kysely';

const dialect: MysqlDialect = new MysqlDialect({
  pool: createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  }),
});

export default defineConfig({
  dialect
});