import dayjs from 'dayjs';

import { UserDTO, UserDTOSchema } from '../../dtos/users/user.dto.ts';

export class UserModel {
  public readonly id: number;
  public readonly firstName?: string;
  public readonly lastName?: string;
  public readonly username?: string;
  public readonly email?: string;
  public readonly createdAt?: string;
  public readonly updatedAt?: string;

  constructor(user: UserDTO) {
    UserDTOSchema.parse(user);

    this.id = user.id;
    this.firstName = this.formatNullableString(user.firstName);
    this.lastName = this.formatNullableString(user.lastName);
    this.username = user.username;
    this.email = user.email;
    this.createdAt = this.formatDateTime(user.createdAt);
    this.updatedAt = this.formatDateTime(user.updatedAt);
  }

  private readonly formatNullableString = (value?: string | null): string | undefined => {
    return value === null ? '' : value;
  };

  private readonly formatDateTime = (datetime?: string): string | undefined => {
    return !datetime ? datetime : dayjs(datetime).format('DD-MM-YYYY HH:mm:ss');
  };
}
