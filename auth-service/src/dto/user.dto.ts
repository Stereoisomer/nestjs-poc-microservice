export enum UserType {
  USER = 'USER',
  MM = 'MARKET_MAKER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class UserDto {
  _id?: any;

  username: string;

  password: string;

  contactEmail: string;

  type: UserType = UserType.USER;
}
