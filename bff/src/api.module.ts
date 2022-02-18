import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiController } from '~controllers/ApiController';

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
    ]),
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {}
