import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// config
import MongoConfig from '~config/mongo.config';

// modules
import { SchemaModule } from '~schemas/schemas.module';

// controllers
import { AppController } from './app.controller';

// services

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
    SchemaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
