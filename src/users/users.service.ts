import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (existingUser) {
      throw new HttpException(
        `User #${createUserDto.email} already exists`,
        409,
      );
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await new this.userModel(createUserDto);
    newUser.save();
    return new User(newUser.toJSON());
  }

  async findAll(): Promise<User[]> {
    const userList = await this.userModel.find().exec();
    return userList.map((user) => new User(user.toJSON()));
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return new User(user.toJSON());
  }

  async update(
    id: number | string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: false,
      })
      .exec();

    return new User(user.toJSON());
  }

  async remove(id: number | string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    return new User(user.toJSON());
  }
}
