import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Status, Task } from '@prisma/client';


interface taskData{
  task_name:       string
  duration:        Date
  status?:         Status
  description:     string
  task_list: {
    connectOrCreate: {
      where: {list_id: number}
      create: {
        list_id?:   number;
        title:      string;
        starts_at:  Date | string;
        ends_at:    Date | string;
        created_at: Date | string;
        user_id:    number;
      }
    }
  }
  //list_id: number
  created_by_id:  number
  assigned_to_id?: number   
  sub_task?: {
    createMany?: {
      data:{
        task_name:      string
        duration:       Date
        status?:        Status
        description:    string
        list_id:       number
        created_by_id: number
      }
    }
    update?: {
      where: {task_id: number}
      data:  {
        task_name?:    string
        duration?:     Date
        status?:       Status
        description?:  string
        task_list?:    {
          connectOrCreate: {
            where: {list_id: number}
            create: {
              list_id?:   number;
              title:      string;
              starts_at:  Date | string;
              ends_at:    Date | string;
              created_at: Date | string;
              user_id:    number;
            }
          }
        } 
      }
    }
    priority?: {
      create: {
        name:       string
        degree:     number
        created_at: Date | string
        created_by: number
      }
    }
  }

}

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('new')
  createTask(@Body() data: taskData): Promise<Task> {
    return this.taskService.create(data);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne({ task_id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: taskData) {
    return this.taskService.update({
      where: {task_id: Number(id)},
      data, 
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove({task_id: Number(id)});
  }
}
