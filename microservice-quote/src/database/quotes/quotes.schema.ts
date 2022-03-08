import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';
import { Instrument } from '~database/instruments/instruments.schema';
import { User } from '~database/users/users.schema';

export type QuoteDocument = Quote & Document;

@Schema()
export class Quote {
  _id?: Schemas.Types.ObjectId;

  @Prop({ type: Schemas.Types.ObjectId, ref: 'Instrument' })
  instrument_id: Instrument;

  @Prop({ type: Schemas.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
