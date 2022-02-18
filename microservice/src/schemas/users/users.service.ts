import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User, UserDocument, UserStatus, UserType } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(str: string): Promise<User | undefined> {
    return this.userModel
      .findOne({
        $or: [{ name: str }, { contactEmail: str }],
      })
      .exec();
  }

  async create(user: User): Promise<User> {
    return new this.userModel({
      name: user.name,
      password: await bcrypt.genSalt(),
      contactEmail: user.contactEmail,
      status: UserStatus.ACTIVE,
      type: user.type || UserType.USER,
      apiKey: await bcrypt.genSalt(),
    }).save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
