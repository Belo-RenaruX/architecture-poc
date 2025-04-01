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
          host: 'bohemia-padel-db-dev.c9wi4eqgchj1.us-east-1.rds.amazonaws.com',
          user: 'devuser',
          password: 'edYhouwPYWI6Xb7bju1dz01t',
          database: 'architecture_test',
          port: 3306,
          connectionLimit: 10,
        }),
      });

      this.instance = new Kysely<Database>({ dialect });
    }

    return this.instance;
  };
}
