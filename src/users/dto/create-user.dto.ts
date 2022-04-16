import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  name: string;
  email: string;

  @IsNotEmpty()
  password: string;

  age: number;
  isAdmin: boolean;
}
