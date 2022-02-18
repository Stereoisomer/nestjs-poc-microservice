import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  // @Post('auth/register/user')
  // registerUser(@Body('user') name: string, @Body('email') email: string) {
  //   const pattern = { action: 'auth/register' };
  //   const payload = {
  //     name: name,
  //     email: email,
  //     type: 'USER',
  //   };
  //   return this.client.send<any>(pattern, payload);
  // }

  @Post('auth/register')
  async registerMarketMaker(
    @Body('user') name: string,
    @Body('email') email: string,
  ) {
    const pattern = { action: 'auth/register' };
    const payload = {
      name: name,
      email: email,
      type: 'MARKET_MAKER',
    };
    return await this.client.send<any>(pattern, payload);
  }

  @Get('auth/list')
  async getUsers() {
    const event = 'get_allUsers';
    return await this.client.send<any>(event, 123);
  }
}
