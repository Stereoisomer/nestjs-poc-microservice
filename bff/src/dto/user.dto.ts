export enum UserType {
  USER = 'USER',
  MM = 'MARKET_MAKER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class UserApiDto {
  username: string;

  password: string;

  contactEmail: string;
}

export class UserMicroserviceDto {
  username: string;

  password: string;

  contactEmail: string;

  type: UserType = UserType.USER;
}

export class User {
  username: string;

  // password: string;

  type: UserType = UserType.USER;

  contactEmail: string;

  status: UserStatus = UserStatus.ACTIVE;

  apiKey: string;
}
