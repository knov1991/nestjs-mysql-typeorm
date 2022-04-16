import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
        isAdmin: false,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', () => {
    const user = {
      name: 'lucas',
      email: 'lucas@lucas.com',
      password: '123',
      age: 22,
    };
    expect(controller.createUser(user)).toEqual({
      id: expect.any(Number),
      name: 'lucas',
      email: 'lucas@lucas.com',
      password: '123',
      age: 22,
      isAdmin: expect.any(Boolean),
    });

    expect(mockUsersService.create).toHaveBeenCalledWith(user);
  });

  /* it('should return all users', () => {
    expect(controller.getAll());
  }); */
});
