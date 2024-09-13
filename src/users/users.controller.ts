// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post()
//   create(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.create(createUserDto);
//   }

//   @Get()
//   findAll() {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.usersService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.usersService.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.usersService.remove(+id);
//   }
// }

import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  Param,
  Post,
  Put,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './user.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  getAllUsers(): string {
    return this.userService.getUser();
  }

  @Get('/:id')
  @HttpCode(200)
  findOne(@Param() params: any): string {
    let response: any;
    try {
      response = this.userService.getUserById(params.id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return response;
  }

  @Post('/new')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createUser(@Body() userDto: UserDto): Promise<any> {
    try {
      const newUser = this.userService.createUser(userDto);

      const { token, refreshToken } = this.userService.generateToken(userDto);

      return {
        message: 'User created successfully',
        token: token.slice(0, 6),
        expires_in: '1h',
        refreshToken: refreshToken.slice(0, 6),
        expiresIn: '2h',
      };
    } catch (error) {
      throw new NotAcceptableException('The body you passed is unacceptable', {
        cause: new Error(),
        description: 'Invalid request body',
      });
    }
  }

  @Put('/:id')
  @HttpCode(200)
  updateUser(@Param() params: any): string {
    return this.userService.updateUser(params.id);
  }

  @Delete('/:id')
  @HttpCode(200)
  deleteUser(@Param() params: any): string {
    return this.userService.deleteUser(params.id);
  }
}
