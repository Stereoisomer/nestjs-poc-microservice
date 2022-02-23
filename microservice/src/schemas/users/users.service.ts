import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Schema } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async insert(user: User): Promise<User> {
    return new this.userModel(user).save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(query: any): Promise<User> {
    return this.userModel.findOne(query).exec();
  }

  async updateById(
    id: string | Schema.Types.ObjectId,
    user: User,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user);
  }
}
