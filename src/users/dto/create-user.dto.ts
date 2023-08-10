import {
  IsOptional,
  IsNotEmpty,
  IsDate,
  IsString,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  readonly id: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  createdDate: Date;
}
