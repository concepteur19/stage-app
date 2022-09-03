import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
//import { Task } from './entities/task.entity';


@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TaskCreateInput | Prisma.TaskUncheckedCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  findOne(task_id: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: task_id,
    });
  }

  findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  update(params: {
    data: Prisma.TaskUpdateInput;
    where: Prisma.TaskWhereUniqueInput;
  }): Promise<Task> {
    const { where, data } = params;
    return this.prisma.task.update({
      data,
      where,
    });
  }

  remove(task_id: Prisma.TaskWhereUniqueInput) {

    const deleteSubTask = this.prisma.task.deleteMany({
      where: task_id,
    });

    const deleteParentTask = this.prisma.task.delete({
      where: task_id,
    });
    
    return this.prisma.$transaction([deleteSubTask, deleteParentTask]);
  }
}
