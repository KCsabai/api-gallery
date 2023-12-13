import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { ImagesService } from './images.service';

import { TransformInterceptor } from 'src/interceptors/Transform.interceptor';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('images')
@UseInterceptors(TransformInterceptor)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images[]', 10, { dest: './public/uploads' }),
  )
  create(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/jpeg' })
        .addMaxSizeValidator({ maxSize: 100000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    files: Express.Multer.File[],
  ) {
    return this.imagesService.create(files);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  update(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/jpeg' })
        .addMaxSizeValidator({ maxSize: 100000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.imagesService.update(id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
