import {
  IsOptional,
  IsNotEmpty,
  IsDate,
  IsString,
  IsEmail,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['user', 'admin'])
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  refreshToken: string;

  @IsDate()
  @IsOptional()
  createdDate: Date;
}
