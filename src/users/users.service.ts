import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id: id });
  }

  /* async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  } */

  async create(userData: CreateUserDto): Promise<User> {
    try {
      if (
        !userData.name ||
        !userData.email ||
        !userData.password ||
        !userData.age
      ) {
        throw new HttpException({}, HttpStatus.BAD_REQUEST);
      }
      return this.userRepository.save(userData);
    } catch (error) {
      throw new HttpException(
        { message: 'Erro ao cadastrar usuário...', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    await this.userRepository.findOneByOrFail({ id: id });
    await this.userRepository.softDelete(id);
  }
}
