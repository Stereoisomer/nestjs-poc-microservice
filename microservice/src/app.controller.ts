import { Controller, Get } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { AuthService } from '~auth/auth.service';

import { User } from '~schemas/users/users.schema';
import { UsersService } from '~schemas/users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ action: 'auth/register' })
  async register(user: User) {
    return this.usersService.create(user).then(
      (user) => {
        return {
          apiKey: user.apiKey,
          password: user.password,
        };
      },
      (e) => {
        throw new RpcException(e);
      },
    );
  }

  @MessagePattern({ action: 'auth/login' })
  async login() {
    return this.usersService.findAll();
  }

  @EventPattern('get_allUsers')
  async listUsers() {
    return this.usersService.findAll();
  }
}
