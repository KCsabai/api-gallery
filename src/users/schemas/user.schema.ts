import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { BaseDBObject } from 'src/database/baseDBObject';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseDBObject {
  @Expose()
  @Prop({ required: true })
  fullname: string;

  @Expose()
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Exclude()
  @Prop({ default: 'user' })
  role: string;

  @Prop()
  refreshToken: string;

  @Expose()
  @Prop({ default: Date.now() })
  createdDate: Date;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
