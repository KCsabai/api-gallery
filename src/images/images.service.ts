import { Injectable, NotFoundException, UploadedFiles } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from './images.repository';
import { Image, ImageDocument } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(private imageRepository: ImageRepository) {}

  create(@UploadedFiles() files: Express.Multer.File[]) {
    const createDtos = new Array<CreateImageDto>();
    files.forEach((file) => {
      createDtos.push(new CreateImageDto(file));
    });
    return this.imageRepository.create(createDtos);
  }

  async findAll(): Promise<Image[]> {
    const imageList = await this.imageRepository.findAll();
    return imageList;
  }

  async findOne(id: string): Promise<Image> {
    const img = await this.imageRepository.findById(id);

    if (!img) {
      throw new NotFoundException(`Image #${id} not found`);
    }

    return img;
  }

  update(id: string, @UploadedFiles() file: Express.Multer.File) {
    const createDto = new CreateImageDto(file);

    return this.imageRepository.update(id, createDto);
  }

  async remove(id: string) {
    return await this.imageRepository.delete(id);
  }
}
