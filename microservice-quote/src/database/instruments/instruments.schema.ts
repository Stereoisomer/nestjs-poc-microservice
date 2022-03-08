import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';
import { InstrumentType } from '~dto/instrument.dto';

export type InstrumentDocument = Instrument & Document;

@Schema()
export class Instrument {
  _id?: Schemas.Types.ObjectId;

  @Prop({ required: true })
  strike: number;

  @Prop({ required: true })
  maturity: Date;

  @Prop({ required: true, default: InstrumentType.PUT })
  type: InstrumentType;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
