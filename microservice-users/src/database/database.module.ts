import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// config
import MongoConfig from '~config/mongo.config';

// modules
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [MongoConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // console.log(configService.get<string>('mongodb.uri'));
        return {
          uri: configService.get<string>('mongodb.uri'),
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
  exports: [UserModule],
})
export class DatabaseModule {}
