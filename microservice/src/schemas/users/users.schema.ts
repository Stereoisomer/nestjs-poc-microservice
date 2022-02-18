import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserType {
  USER = 'USER',
  MM = 'MARKET_MAKER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: UserType.USER })
  type: UserType;

  @Prop({ required: true })
  contactEmail: string;

  @Prop({ required: true, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ required: true })
  apiKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
