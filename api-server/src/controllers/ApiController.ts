import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LocalAuthGuard } from '~guards/local-auth.guard';
import { User, UserApiDto, UserMicroserviceDto, UserType } from '~dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '~guards/jwt-auth.guard';
import { firstValueFrom } from 'rxjs';
import { InstrumentDto } from '~dto/instrument.dto';
import { QuoteDto } from '~dto/quote.dto';

@Controller()
export class ApiController {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    @Inject('INSTRUMENT_SERVICE') private instrumentClient: ClientProxy,
    @Inject('QUOTE_SERVICE') private quoteClient: ClientProxy,
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
    return this.userClient.send<any>(pattern, payload);
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
      this.userClient.send<any>(
        { action: 'auth/getUserByName' },
        userDto.username,
      ),
    );

    console.log(user);

    const pattern = { action: 'auth/updateUser' };
    return this.userClient.send<any>(pattern, { ...user, ...userDto });
  }

  @Post('instrument/create')
  @UseGuards(JwtAuthGuard)
  async createInstrument(@Body() instrumentDto: InstrumentDto) {
    console.log('inside createInstrument');

    console.log(instrumentDto);
    return this.instrumentClient.send<any>(
      { action: 'instrument/create' },
      instrumentDto,
    );
  }

  @Post('quote/create')
  @UseGuards(JwtAuthGuard)
  async createQuote(@Req() req: any) {
    console.log('inside createQuote');
    // console.log(req);

    const { username, password } = req.user;
    console.log(username, password);
    const body: QuoteDto = req.body;
    console.log(body);

    const user = await firstValueFrom(
      this.userClient.send<User>({ action: 'auth/getUserByName' }, username),
    );

    return this.quoteClient.send<any>(
      { action: 'quote/create' },
      {
        instrument_id: body.instrument_id,
        user_id: user._id,
      },
    );
  }
}
