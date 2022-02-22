import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LocalAuthGuard } from '~guards/local-auth.guard';
import { UserApiDto, UserMicroserviceDto, UserType } from '~dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class ApiController {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  @Post('auth/register')
  async registerMarketMaker(@Body() userDto: UserApiDto) {
    const pattern = { action: 'auth/register' };
    const payload: UserMicroserviceDto = {
      username: userDto.username,
      password: userDto.password,
      type: UserType.MM,
      contactEmail: userDto.contactEmail,
    };
    return await this.client.send<any>(pattern, payload);
  }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async getUsers(@Body() req: any) {
    console.log('inside login');
    const username: string = req.username;
    const password: string = req.password;

    return this.jwtService.sign({ username, password });
  }
}
