import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

import { Instrument } from '~database/instruments/instruments.schema';
import { InstrumentsService } from '~database/instruments/instruments.service';
import { InstrumentType, InstrumentDto } from '~dto/instrument.dto';

const saltRounds = 17;

@Controller()
export class AppController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ action: 'instrument/create' })
  async create(instrumentDto: InstrumentDto): Promise<Instrument> {
    const instrument: Instrument = {
      strike: instrumentDto.strike,
      maturity: instrumentDto.maturity,
      type: instrumentDto.type,
    };
    return this.instrumentsService.insert(instrument).then(
      (instrument) => {
        return instrument;
      },
      (e) => {
        throw new RpcException(e);
      },
    );
  }

  @MessagePattern({ action: 'instrument/getByStrike' })
  async getByStrike(strike: number): Promise<Instrument> {
    console.log('inside instrument/getByStrike');
    console.log(strike);
    let result = await this.instrumentsService.findOne({
      strike: {
        $lt: strike,
      },
    });
    console.log(result);
    if (result) {
      return result;
    } else return null;
  }

  @MessagePattern({ action: 'instrument/getBeforeMaturity' })
  async getBeforeMaturity(maturity: Date): Promise<Instrument> {
    console.log('inside instrument/getBeforeMaturity');
    console.log(maturity);
    let result = await this.instrumentsService.findOne({
      maturity: {
        $lt: maturity,
      },
    });
    if (result) {
      return result;
    } else return null;
  }
}
