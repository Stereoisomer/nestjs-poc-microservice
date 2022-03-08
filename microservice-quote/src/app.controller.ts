import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

import { Quote } from '~database/quotes/quotes.schema';
import { QuotesService } from '~database/quotes/quotes.service';
import { QuoteDto } from '~dto/quote.dto';

const saltRounds = 17;

@Controller()
export class AppController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ action: 'quote/create' })
  async create(quoteDto: QuoteDto): Promise<Quote> {
    return this.quotesService.create(quoteDto).then(
      (instrument) => {
        return instrument;
      },
      (e) => {
        throw new RpcException(e);
      },
    );
  }

  @MessagePattern({ action: 'quote/get' })
  async get(quoteDto: QuoteDto): Promise<Quote> {
    console.log('inside quote/get');
    console.log(quoteDto);
    let result = await this.quotesService.findOne(quoteDto);
    console.log(result);
    if (result) {
      return result;
    } else return null;
  }
}
