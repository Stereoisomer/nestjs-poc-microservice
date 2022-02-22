import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

import { AuthService } from '~auth/auth.service';
import { UserDto, UserStatus } from '~dto/user.dto';
import { User } from '~schemas/users/users.schema';
import { UsersService } from '~schemas/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

const saltRounds = 17;

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
  async register(userDto: UserDto) {
    const user: User = {
      username: userDto.username,
      password: await bcrypt.hash(userDto.password, saltRounds),
      type: userDto.type,
      contactEmail: userDto.contactEmail,
      status: UserStatus.ACTIVE,
      apiKey: Buffer.from(
        await bcrypt.hash(
          Date.now().toString() + userDto.contactEmail,
          saltRounds,
        ),
      ).toString('base64'),
    };
    return this.authService.createUser(user).then(
      (user) => {
        // console.log(user);
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

  // @UseGuards(LocalAuthGuard)
  @MessagePattern({ action: 'auth/getUserByName' })
  async getUserByName(username: string) {
    console.log('inside auth/login');
    console.log(username);
    let result = await this.usersService.findOne({
      username: username,
    });
    if (result) {
      return result;
    } else return null;
  }

  @MessagePattern({ action: 'auth/get_profile' })
  async getProfile(req: any) {
    return this.usersService.findOne(req.user);
  }
}
