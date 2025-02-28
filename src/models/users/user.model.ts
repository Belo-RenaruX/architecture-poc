import dayjs from "dayjs";
import { UserDTO, UserDTOSchema } from "../../dtos/users/user.dto";

export class UserModel {
  readonly id: number;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;

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

  private formatNullableString(value?: string | null): string | undefined {
    return value === null ? '' : value;
  }

  private formatDateTime(datetime?: string): string | undefined {
    return !datetime ? datetime : dayjs(datetime).format('DD-MM-YYYY HH:mm:ss');
  }
}