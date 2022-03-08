import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Schema } from 'mongoose';
import { Instrument, InstrumentDocument } from './instruments.schema';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectModel(Instrument.name)
    private instrumentModel: Model<InstrumentDocument>,
  ) {}

  async insert(instrument: Instrument): Promise<Instrument> {
    return new this.instrumentModel(instrument).save();
  }

  async findAll(): Promise<Instrument[]> {
    return this.instrumentModel.find().exec();
  }

  async findOne(query: any): Promise<Instrument> {
    return this.instrumentModel.findOne(query).exec();
  }

  async updateById(
    id: string | Schema.Types.ObjectId,
    instrument: Instrument,
  ): Promise<Instrument> {
    return this.instrumentModel.findByIdAndUpdate(id, instrument);
  }
}
