import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new HttpException(
        `User #${createUserDto.email} already exists`,
        409,
      );
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const userList = await this.userRepository.findAll();
    return userList;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(
    id: number | string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.update(id, updateUserDto);

    return user;
  }

  async remove(id: number | string): Promise<User> {
    return await this.userRepository.delete(id);
  }
}
