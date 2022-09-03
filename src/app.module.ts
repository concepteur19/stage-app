import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import { ListModule } from './list/list.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule, ListModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
