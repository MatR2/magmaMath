import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @Length(2)
  name?: string;

  @IsString()
  @IsEmail()
  email?: string;
}
