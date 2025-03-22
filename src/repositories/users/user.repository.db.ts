import {
  Kysely,
  InsertQueryBuilder,
  SelectQueryBuilder,
  UpdateQueryBuilder,
  DeleteQueryBuilder,
  DeleteResult,
  InsertResult,
  UpdateResult,
  InsertObject,
  UpdateObject,
} from 'kysely';

import { Database } from '../../clients/mysql.client.ts';
import { UserDTO, UserInsertDTO, UserUpdateDTO } from '../../dtos/users/user.dto.ts';
import { TransactionUserModel } from '../../models/users/transactionUser.model.ts';

import { IUserRepository } from './user.repository.interface.ts';

export class UserRepository implements IUserRepository {
  private readonly baseSelect: SelectQueryBuilder<Database, 'User', Partial<UserDTO>>;
  private readonly baseInsert: InsertQueryBuilder<Database, 'User', InsertResult>;
  private readonly baseUpdate: UpdateQueryBuilder<Database, 'User', 'User', UpdateResult>;
  private readonly baseDelete: DeleteQueryBuilder<Database, 'User', DeleteResult>;

  constructor(db: Kysely<Database>) {
    this.baseSelect = db.selectFrom('User');
    this.baseInsert = db.insertInto('User');
    this.baseUpdate = db.updateTable('User');
    this.baseDelete = db.deleteFrom('User');
  }

  public findUserById = async (id: number): Promise<UserDTO | undefined> => {
    return this.baseSelect
      .select(['id', 'firstName', 'lastName', 'username', 'email'])
      .where('id', '=', id)
      .executeTakeFirst();
  };

  public signInUser = async (email: string): Promise<Required<UserDTO> | undefined> => {
    return this.baseSelect.selectAll().where('email', '=', email).executeTakeFirst();
  };

  public getAllUsers = async (nameSearch?: string): Promise<UserDTO[]> => {
    return this.baseSelect
      .select(['id', 'firstName', 'lastName', 'username', 'email'])
      .where('firstName', 'like', `%${nameSearch ?? ''}%`)
      .execute();
  };

  public insertUser = async (userData: TransactionUserModel<UserInsertDTO>): Promise<InsertResult> => {
    return this.baseInsert.values(userData.toPlainObject() as InsertObject<Database, 'User'>).executeTakeFirstOrThrow();
  };

  public insertUsersBulk = async (usersData: TransactionUserModel<UserInsertDTO>[]): Promise<InsertResult> => {
    return this.baseInsert
      .values(usersData.map((user) => user.toPlainObject()) as InsertObject<Database, 'User'>[])
      .executeTakeFirstOrThrow();
  };

  public updateUser = async (id: number, updates: TransactionUserModel<UserUpdateDTO>): Promise<UpdateResult> => {
    return this.baseUpdate
      .set(updates.toPlainObject() as UpdateObject<Database, 'User'>)
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
  };

  public deleteUser = async (id: number): Promise<DeleteResult> => {
    return this.baseDelete.where('id', '=', id).executeTakeFirstOrThrow();
  };
}
