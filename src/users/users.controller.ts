import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    try {
      const user = await this.usersService.getById(+id);
      if (user) {
        return user;
      } else {
        return {
          message: 'Usuário não encontrado...',
          success: false,
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao procurar usuário...',
          success: false,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /* @Post('/create')
  createUser(@Body() user: CreateUserDto) {
    try {
      return this.usersService.create(user);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao inserir usuário...',
          success: false,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  } */

  @Post('/create')
  async createUser(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Delete('/delete/:id')
  async delete(@Param() id: number) {
    try {
      const user = await this.usersService.getById(+id);
      if (user) {
        this.usersService.delete(id);
        return {
          message: 'Usuário removido com sucesso!',
          success: true,
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao remover usuário...',
          success: false,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
