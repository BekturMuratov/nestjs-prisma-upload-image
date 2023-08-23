import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(private prismaService: PrismaService) {}

  async createPostWithImages(postData: any, images: Express.Multer.File[]) {
    // Create the post
    const post = await this.prismaService.post.create({
      data: {
        title: postData.title,
        content: postData.content,
      },
      include: {
        images: true,
      },
    });

    // Create and associate the images with the post
    for (const image of images) {
      const imageUrl = `/uploads/${image.filename}`; // Adjust this based on your storage configuration
      await this.prismaService.image.create({
        data: {
          url: imageUrl,
          postId: post.id,
        },
      });
    }

    return post;
  }

  findAll() {
    return this.prismaService.post.findMany({
      include: {
        images: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
      },
    });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
