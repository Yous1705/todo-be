import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TodoModule, PrismaModule, CategoryModule, AuthModule, CloudinaryModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
