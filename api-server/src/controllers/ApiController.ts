import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Post('auth/register')
  getHello(@Body('user') name: string) {
    const pattern = { action: 'add_user' };
    const payload = name;
    return this.client.emit<any>(pattern, payload); // emit has no return value
  }

  @Get('auth/list')
  getUsers() {
    const event = 'get_allUsers';
    return this.client.send<any>(event, 123);
  }
}
