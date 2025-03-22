import { DeleteResult, InsertResult, UpdateResult } from 'kysely';

import { UserDTO, UserInsertDTO, UserUpdateDTO } from '../../dtos/users/user.dto.ts';
import { TransactionUserModel } from '../../models/users/transactionUser.model.ts';

export interface IUserRepository {
  findUserById(id: number): Promise<UserDTO | undefined>;
  signInUser(email: string): Promise<Required<UserDTO> | undefined>;
  getAllUsers(nameSearch?: string): Promise<UserDTO[]>;
  insertUser(userData: TransactionUserModel<UserInsertDTO>): Promise<InsertResult>;
  insertUsersBulk(usersData: TransactionUserModel<UserInsertDTO>[]): Promise<InsertResult>;
  updateUser(id: number, userUpdates: TransactionUserModel<UserUpdateDTO>): Promise<UpdateResult>;
  deleteUser(id: number): Promise<DeleteResult>;
}
