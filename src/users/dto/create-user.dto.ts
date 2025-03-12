import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@IsNotEmpty()
	@ApiProperty()
	firstName: string;

	@IsNotEmpty()
	@ApiProperty()
	lastName: string;

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@ApiProperty()
	password: string;
}
