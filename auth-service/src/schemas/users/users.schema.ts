import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';
import { UserStatus, UserType } from '~dto/user.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id?: Schemas.Types.ObjectId;

  @Prop({ required: true })
  username: string;

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
