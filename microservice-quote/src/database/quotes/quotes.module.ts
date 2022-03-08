import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Quote, QuoteSchema } from './quotes.schema';
import { QuotesService } from './quotes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  controllers: [],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuoteModule {}
