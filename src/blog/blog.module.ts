import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Define your storage destination
        filename: (req, file, cb) => {
          // Define how the file should be named
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
})
export class BlogModule {}
