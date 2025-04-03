import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('User')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('firstName', 'varchar(255)')
    .addColumn('lastName', 'varchar(255)')
    .addColumn('username', 'varchar(255)', (col) => col.notNull())
    .addColumn('passwordHash', 'varchar(255)', (col) => col.notNull())
    .addColumn('passwordSalt', 'varchar(255)', (col) => col.notNull())
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('createdAt', 'datetime', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updatedAt', 'datetime', (col) => col.notNull().defaultTo(sql`NOW()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('User').execute();
}