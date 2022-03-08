import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

// modules

// config
import JwtConfig from '~config/auth.config';

// service

// strategies
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8001,
        },
      },
      {
        name: 'INSTRUMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8002,
        },
      },
      {
        name: 'QUOTE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8003,
        },
      },
    ]),
    ConfigModule.forRoot({
      load: [JwtConfig],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwt.secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LocalStrategy, JwtStrategy],
  exports: [ClientsModule],
})
export class AuthModule {}
