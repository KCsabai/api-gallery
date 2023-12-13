import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { BaseDBObject } from 'src/database/baseDBObject';

export type ImageDocument = Image & Document;

@Schema()
export class Image extends BaseDBObject {
  @Expose()
  @Prop({ required: true })
  originalName: string;

  @Expose()
  @Prop({ required: true })
  fileName: string;

  @Expose()
  @Prop({ required: true })
  mimetype: string;

  @Expose()
  @Prop({ required: true })
  size: number;

  @Expose()
  @Prop({ default: Date.now() })
  createdDate: Date;

  constructor(partial: Partial<Image>) {
    super();
    Object.assign(this, partial);
  }
}

export const ImageSchema = SchemaFactory.createForClass(Image);
