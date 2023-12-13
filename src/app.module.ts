import { Module } from '@nestjs/common';

// for use env
import config from './config/app.config';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    // for use env
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    // for use mongodb
    MongooseModule.forRoot(process.env.MONGO_URI),

    // to save static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploads'),
    }),
    UsersModule,
    AuthModule,
    ImagesModule,
  ],
})
export class AppModule {}
