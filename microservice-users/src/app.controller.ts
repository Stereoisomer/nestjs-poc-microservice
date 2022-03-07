import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

import { User } from '~database/users/users.schema';
import { UsersService } from '~database/users/users.service';
import { UserDto, UserStatus } from '~dto/user.dto';

const saltRounds = 17;

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.insert(user).then(
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

  @MessagePattern({ action: 'auth/getUserByName' })
  async getUserByName(username: string) {
    console.log('inside auth/getUserByName');
    console.log(username);
    let result = await this.usersService.findOne({
      username: username,
    });
    console.log(result);
    if (result) {
      return result;
    } else return null;
  }

  @MessagePattern({ action: 'auth/getUserById' })
  async getUserById(id: string | Schema.Types.ObjectId) {
    console.log('inside auth/getUserById');
    console.log(id);
    let result = await this.usersService.findOne({
      _id: id,
    });
    if (result) {
      return result;
    } else return null;
  }

  @MessagePattern({ action: 'auth/updateUser' })
  async updateUser(user: User) {
    console.log('inside auth/updateUser');
    console.log('received: ', user);
    const oldData = await this.getUserById(user._id);
    console.log('existing records: ', oldData);
    if (oldData) {
      const result = await this.usersService.updateById(oldData._id, user);
      console.log('result: ', result);
      return result;
    } else return null;
  }
}
