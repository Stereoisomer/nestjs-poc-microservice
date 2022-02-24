import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { ClientProxy } from '@nestjs/microservices';
import { User } from '~dto/user.dto';
import { promisify } from 'util';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {
    super({
      // usernameField: 'email',
      // passwordField: 'apiKey',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('validation');

    const pattern = { action: 'auth/getUserByName' };

    const result = await firstValueFrom(
      this.client.send<User>(pattern, username),
    );
    console.log(result);
    return result;
  }
}
