import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '~auth/auth.module';
import AuthConfig from '~config/auth.config';
import { ApiController } from '~controllers/ApiController';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [AuthConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwt.secret'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {}
