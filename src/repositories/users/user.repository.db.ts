import { IUserRepository } from './user.repository.interface';
import { Database } from '../../clients/mysql.client'
import { UserDTO, UserInsertDTO, UserUpdateDTO } from '../../dtos/users/user.dto';
import { TransactionUserModel } from '../../models/users/transactionUser.model';
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

export class UserRepository implements IUserRepository {
  private baseSelect: SelectQueryBuilder<Database, 'User', Partial<UserDTO>>
  private baseInsert: InsertQueryBuilder<Database, 'User', InsertResult>
  private baseUpdate: UpdateQueryBuilder<Database, 'User', 'User', UpdateResult>
  private baseDelete: DeleteQueryBuilder<Database, 'User', DeleteResult>

  constructor(db: Kysely<Database>) {
    this.baseSelect = db.selectFrom('User');
    this.baseInsert = db.insertInto('User');
    this.baseUpdate = db.updateTable('User');
    this.baseDelete = db.deleteFrom('User');
  }

  async findUserById(id: number): Promise<UserDTO | undefined> {
    return this.baseSelect
      .select(['id', 'firstName', 'lastName', 'username', 'email'])
      .where('id', '=', id)
      .executeTakeFirst();
  }

  async signInUser(email: string): Promise<Required<UserDTO> | undefined> {
    return this.baseSelect
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
  }

  async getAllUsers(nameSearch?: string): Promise<UserDTO[]> {
    return this.baseSelect
      .select(['id', 'firstName', 'lastName', 'username', 'email'])
      .where('firstName', 'like', `%${nameSearch ?? ''}%`)
      .execute();
  }

  async insertUser(userData: TransactionUserModel<UserInsertDTO>): Promise<InsertResult> {
    return this.baseInsert
      .values(userData.toPlainObject() as InsertObject<Database, 'User'>)
      .executeTakeFirstOrThrow();
  }

  async insertUsersBulk(usersData: TransactionUserModel<UserInsertDTO>[]): Promise<InsertResult> {
    return this.baseInsert
      .values(usersData.map(user => user.toPlainObject()) as InsertObject<Database, 'User'>[])
      .executeTakeFirstOrThrow();
  }

  async updateUser(id: number, updates: TransactionUserModel<UserUpdateDTO>): Promise<UpdateResult> {
    return this.baseUpdate
      .set(updates.toPlainObject() as UpdateObject<Database, 'User'>)
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.baseDelete
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
  }
}