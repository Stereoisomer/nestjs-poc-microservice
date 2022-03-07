
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserType {
  USER = "USER",
  MM = "MARKET_MAKER"
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

@Schema()
export class User {

  @Prop({required: true})
  name: string;

  @Prop()
  type: UserType;

  @Prop()
  status: UserStatus;

  @Prop()
  apiKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
