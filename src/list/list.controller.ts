import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Status } from '@prisma/client';
import { ListService } from './list.service';


interface listData {
  title:      string
  starts_at:  Date
  ends_at:    Date  
  user_id:    number
}

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('new')
  create(@Body() data: listData ) {
    return this.listService.create(data);
  }

  @Get()
  findAll() {
    return this.listService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne({
      list_id: Number(id)
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: listData) {
    return this.listService.update({
      where: {list_id: Number(id)},
      data 
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.removeList({list_id: Number(id)});
  }
}
