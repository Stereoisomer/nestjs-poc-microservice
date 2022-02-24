import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CipherGCM, createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '~schemas/users/users.schema';
import { UsersService } from '~schemas/users/users.service';

@Injectable()
export class AuthService {
  private cipher: CipherGCM;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: User) {
    try {
      return this.usersService.insert(user);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getUser(str: string) {
    try {
      return this.usersService.findOne({
        $or: [{ username: str }, { contactEmail: str }, { apiKey: str }],
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
