import { Injectable } from '@nestjs/common';
import { List, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ListCreateInput | Prisma.ListUncheckedCreateInput) {
    return this.prisma.list.create({data});
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ListWhereUniqueInput;
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByWithRelationInput;
  }): Promise<List[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.list.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(list_id: Prisma.ListWhereUniqueInput): Promise<List | null> {
    return this.prisma.list.findUnique({
      where: list_id,
    });
  }

  update(params: {
    data: Prisma.ListUpdateInput | Prisma.ListUncheckedUpdateInput;
    where: Prisma.ListWhereUniqueInput;
  }): Promise<List> {
    const { where, data } = params;
    return this.prisma.list.update({
      data,
      where,
    });
  }

  removeList(list_id: Prisma.ListWhereUniqueInput) {
    const deleteTaskAndSub = this.prisma.task.deleteMany(
      {where: list_id}
    )

    const deleteList = this.prisma.list.delete(
      {where: list_id}
    )
    return this.prisma.$transaction([deleteTaskAndSub, deleteList]);
  }
}
