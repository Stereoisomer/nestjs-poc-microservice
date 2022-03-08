import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Instrument, InstrumentSchema } from './instruments.schema';
import { InstrumentsService } from './instruments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
  controllers: [],
  providers: [InstrumentsService],
  exports: [InstrumentsService],
})
export class InstrumentModule {}
