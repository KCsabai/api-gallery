import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Image, ImageDocument } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageRepository {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  private convertToImage(image): Image {
    if (!image) return null;

    return new Image(image.toJSON());
  }

  async findById(id: string): Promise<Image> {
    const result = await this.imageModel.findOne({ _id: id }).exec();
    return this.convertToImage(result);
  }

  async findAll(): Promise<Image[]> {
    const result = await this.imageModel.find().exec();
    return result.map((image) => this.convertToImage(image));
  }

  async findByEmail(email: string): Promise<Image> {
    const result = await this.imageModel.findOne({ email }).exec();
    return this.convertToImage(result);
  }

  async create(images: Array<CreateImageDto>): Promise<Image[]> {
    const promises = images.map((img) => new this.imageModel(img).save());
    const responses = await Promise.all(promises);

    return responses.map((res) => this.convertToImage(res));
  }

  async update(id: string | number, image: UpdateImageDto): Promise<Image> {
    const result = await this.imageModel.findByIdAndUpdate(id, image, {
      new: true,
    });
    return this.convertToImage(result);
  }

  async delete(id: string | number): Promise<Image> {
    const result = await this.imageModel.findByIdAndRemove(id);
    return this.convertToImage(result);
  }
}
