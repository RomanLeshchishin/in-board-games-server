import {ApiProperty} from "@nestjs/swagger";
import {IsEmail} from "class-validator";

export class UpdateUserDto {
	@ApiProperty()
	firstName?: string;

	@ApiProperty()
	lastName?: string;

	@IsEmail()
	@ApiProperty()
	email?: string;
}
