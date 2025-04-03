import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';

import { UserTableDTO } from 'src/dtos/users/user.dto.ts';

export interface Database {
  User: UserTableDTO;
}

export class DatabaseClient {
  private static instance: Kysely<Database>;

  public static getInstance = (): Kysely<Database> => {
    if (!this.instance) {
      const dialect = new MysqlDialect({
        pool: createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
          connectionLimit: 10,
        }),
      });

      this.instance = new Kysely<Database>({ dialect });
    }

    return this.instance;
  };
}
