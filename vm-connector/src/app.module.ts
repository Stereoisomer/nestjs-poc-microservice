import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

// config
import MongoConfig from '~config/mongo.config';

// modules
import { ApiModule } from './api.module';

// controllers
import { AppController } from './app.controller';

// services
import { AppService } from './app.service';

// routes
const routes: Routes = [
  {
    path: 'api/1.0',
    module: ApiModule,
  },
];

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
    RouterModule.register(routes),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
