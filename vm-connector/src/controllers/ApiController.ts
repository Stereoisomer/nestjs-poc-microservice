import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LocalAuthGuard } from '~guards/local-auth.guard';
import { UserApiDto, UserMicroserviceDto, UserType } from '~dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '~guards/jwt-auth.guard';
import { firstValueFrom } from 'rxjs';

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
    return this.client.send<any>(pattern, payload);
  }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async getUsers(@Body() req: any) {
    console.log('inside login');
    const username: string = req.username;
    const password: string = req.password;

    return this.jwtService.sign({ username, password });
  }

  @Put('auth/update_profile')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() userDto: UserApiDto) {
    console.log('inside update_profile');

    console.log(userDto.username);
    const user = await firstValueFrom(
      this.client.send<any>({ action: 'auth/getUserByName' }, userDto.username),
    );

    console.log(user);

    const pattern = { action: 'auth/updateUser' };
    return this.client.send<any>(pattern, { ...user, ...userDto });
  }
}
