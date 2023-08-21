import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await new this.userModel(createUserDto);
    newUser.save();
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const userList = await this.userModel.find().exec();
    return userList.map((user) => new User(user.toJSON()));
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOne(id: number): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`Student #${id} not found`);
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: false,
    });
  }

  async remove(id: number): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
