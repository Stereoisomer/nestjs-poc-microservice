import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// config
import MongoConfig from '~config/mongo.config';

// modules
import { DatabaseModule } from 'src/database/database.module';

// controllers
import { AppController } from './app.controller';

// services

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [MongoConfig],
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
