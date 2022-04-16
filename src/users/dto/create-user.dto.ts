import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  age: number;
  //isAdmin: boolean;
}
