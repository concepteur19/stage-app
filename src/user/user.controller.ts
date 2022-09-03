import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma, Role, Status } from '@prisma/client';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
 
interface userData {
  email?:         string
  password?:      string
  username?:      string
  user_role?:     Role 
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  create(@Body() data: Prisma.UserCreateInput) {
    const {password} = data
    const passwordHashed = bcrypt.hashSync(password, 10)
    return this.userService.create({...data, password: passwordHashed});
  }

  @Get()
  findAll() {
    return this.userService.findAll().then((foundUsers) => {
      const users = foundUsers.map((user) => {
        return {
          name: user.username, 
          email: user.email, 
          role: user.user_role,
          time: user.create_time
        }
      })
      return users
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({
      user_id: Number(id)
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: userData) {
    return this.userService.update({
      where: {user_id: Number(id)},
      data
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({
      user_id: Number(id)
    });
  }
}
