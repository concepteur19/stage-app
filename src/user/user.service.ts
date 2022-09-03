import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<User>  {
    return this.prisma.user.create({
      data
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(email: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: email,
    });
  }

  update(params: {
    data: Prisma.UserUpdateInput;
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  // +++++++++++++ remove user list and task
  /*remove( param: {
      where: Prisma.UserWhereUniqueInput,
      data: Prisma.TaskWhereInput
    }
  ) {
    const { where, data } = param

    const deleteTask = this.prisma.task.deleteMany({
      where: data,
    });

    const deletelist = this.prisma.list.deleteMany({
      where: where,
    });

    const deleteUser = this.prisma.user.delete({
      where: where,
    });
    return this.prisma.$transaction([deleteTask, deletelist, deleteUser]);
  }*/
  remove(user_id: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where: user_id })
  }
}
