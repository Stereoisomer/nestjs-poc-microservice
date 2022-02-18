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

  async initCipher(ivSize: number, password: string) {
    const iv = randomBytes(ivSize);
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    this.cipher = createCipheriv('aes-256-gcm', key, iv);
  }

  private async encrypt(password: string): Promise<Buffer> {
    return Buffer.concat([this.cipher.update(password), this.cipher.final()]);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log(user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    const encrypted = this.encrypt(user.password);
    return this.usersService.create(user);
  }
}
