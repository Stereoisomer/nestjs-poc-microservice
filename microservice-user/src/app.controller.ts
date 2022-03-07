import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UsersService } from '~schemas/users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ action: 'add_user' })
  async addUser(name: string) {
    return this.usersService.create(name);
  }

  @EventPattern('get_allUsers')
  async listUsers() {
    return this.usersService.findAll();
  }
}
