import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// modules
import { SchemaModule } from '~schemas/schemas.module';

// config
import JwtConfig from '~config/auth.config';

// service
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [JwtConfig],
    }),
    SchemaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwt.secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
