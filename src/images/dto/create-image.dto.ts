import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  fileName: string;

  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;

  @IsDate()
  createdDate: Date;

  @IsString()
  originalName: string;

  constructor(file) {
    this.fileName = file.filename;
    this.mimetype = file.mimetype;
    this.size = file.size;
    this.originalName = file.originalname;
  }
}
