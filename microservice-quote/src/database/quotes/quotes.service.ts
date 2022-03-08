import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Schema } from 'mongoose';
import { Quote, QuoteDocument } from './quotes.schema';
import { QuoteDto } from '~dto/quote.dto';
import { Instrument } from '~database/instruments/instruments.schema';
import { User } from '~database/users/users.schema';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name)
    private quoteModel: Model<QuoteDocument>,
  ) {}

  async create(quote: QuoteDto): Promise<Quote> {
    return new this.quoteModel(quote).save();
  }

  async findAll(): Promise<Quote[]> {
    return this.quoteModel.find().exec();
  }

  async findOne(query: any): Promise<Quote> {
    return this.quoteModel
      .findOne(query)
      .populate('instrument_id', null, Instrument.name)
      .populate('user_id', null, User.name)
      .exec();
  }

  async updateById(
    id: string | Schema.Types.ObjectId,
    quote: Quote,
  ): Promise<Quote> {
    return this.quoteModel.findByIdAndUpdate(id, quote);
  }
}
