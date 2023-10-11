import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private convertToUser(user): User {
    if (!user) return null;

    return new User(user.toJSON());
  }

  async findById(id: string): Promise<User> {
    const result = await this.userModel.findOne({ _id: id }).exec();
    return this.convertToUser(result);
  }

  async findAll(): Promise<User[]> {
    const result = await this.userModel.find().exec();
    return result.map((user) => this.convertToUser(user));
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.userModel.findOne({ email }).exec();
    return this.convertToUser(result);
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(user);
    newUser.save();
    return this.convertToUser(newUser);
  }

  async update(id: string | number, user: UpdateUserDto): Promise<User> {
    const result = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    return this.convertToUser(result);
  }

  async delete(id: string | number): Promise<User> {
    const result = await this.userModel.findByIdAndRemove(id);
    return this.convertToUser(result);
  }
}
