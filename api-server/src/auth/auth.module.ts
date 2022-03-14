import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

// modules

// config
import JwtConfig from '~config/auth.config';
import MicroservicesConfig from '~config/microservices.config';

// service

// strategies
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [JwtConfig, MicroservicesConfig],
    }),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          console.log(configService.get<string>('microservices.users.host'));
          console.log(configService.get<number>('microservices.users.port'));
          return {
            transport: Transport.TCP,
            options: {
              host: 'users',
              port: configService.get<number>('microservices.users.port'),
            },
          };
        },
      },
      {
        name: 'INSTRUMENT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('microservices.instruments.host'),
            port: configService.get<number>('microservices.instruments.port'),
          },
        }),
      },
      {
        name: 'QUOTE_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('microservices.quote.host'),
            port: configService.get<number>('microservices.quote.port'),
          },
        }),
      },
    ]),
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
