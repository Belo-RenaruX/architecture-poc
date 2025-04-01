import { DeleteResult, InsertResult, UpdateResult } from 'kysely';

import { UserResultDTO, UserTableDTO } from '../../dtos/users/user.dto.ts';
import { TransactionUserModel } from '../../models/users/transactionUser.model.ts';

export interface IUserRepository {
  findUserById(id: number): Promise<UserResultDTO | undefined>;
  signInUser(email: string): Promise<UserTableDTO | undefined>;
  getAllUsers(nameSearch?: string): Promise<UserResultDTO[]>;
  insertUser(userData: TransactionUserModel): Promise<InsertResult>;
  insertUsersBulk(usersData: TransactionUserModel[]): Promise<InsertResult>;
  updateUser(id: number, userUpdates: TransactionUserModel): Promise<UpdateResult>;
  deleteUser(id: number): Promise<DeleteResult>;
}
