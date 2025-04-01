import { UserInsertDTO, UserTransactionDTO, UserUpdateDTO } from '../../dtos/users/user.dto.ts';
import { IEncryptionManager } from '../../managers/encryption.manager.ts';

export class TransactionUserModel {
  public readonly firstName?: string | null;
  public readonly lastName?: string | null;
  public readonly username?: string;
  public readonly email?: string;
  public readonly passwordHash?: string;
  public readonly passwordSalt?: string;

  private constructor(user: UserInsertDTO | UserUpdateDTO, passwordHash?: string, passwordSalt?: string) {
    this.firstName = user.firstName || null;
    this.lastName = user.lastName || null;
    this.username = user.username;
    this.email = user.email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
  }

  public static create = async (
    user: UserInsertDTO | UserUpdateDTO,
    encryptionManager: IEncryptionManager,
  ): Promise<TransactionUserModel> => {
    const { hash, salt } = !user.password ? {} : await encryptionManager.hashPassword(user.password);
    return new TransactionUserModel(user, hash, salt);
  };

  public toPlainObject = (): UserTransactionDTO => {
    return Object.fromEntries(
      Object.entries(this).filter(([_, value]) => typeof value !== 'function' && value !== undefined),
    );
  };
}
