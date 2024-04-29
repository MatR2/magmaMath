import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
