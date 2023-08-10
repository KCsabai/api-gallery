import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class BaseDBObject {
  // this will expose the _id field as a string
  // and will change the attribute name to `id`
  @Expose({ name: 'id' })
  @Transform((value) => value && value.toString())
  @IsOptional()
  // tslint:disable-next-line: variable-name
  _id: any;

  @Exclude()
  @IsOptional()
  // tslint:disable-next-line: variable-name
  __v: any;
}
