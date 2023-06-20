import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get users' })
  @Get()
  getAllUsers(): Promise<Array<User>> {
    return this.usersService.getAllUsers();
  }
}
