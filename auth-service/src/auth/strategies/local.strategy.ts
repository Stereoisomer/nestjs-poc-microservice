import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

import { AuthService } from '~auth/auth.service';

const saltRounds = 17;
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<string> {
    console.log('validation');
    // const user = await this.authService.validateUser(username, password);
    // const encryptedPw = await bcrypt.hash(password, saltRounds);
    // console.log(encryptedPw);
    // if (user && user.password === encryptedPw) {
    //   // const { password, ...result } = user;
    //   // return result;
    //   return user;
    // }
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    return username;
  }
}
