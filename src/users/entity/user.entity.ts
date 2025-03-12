import {Role} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class UserEntity {
	@ApiProperty()
	id: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	role: Role;

	@ApiProperty()
	firstName: string;

	@ApiProperty()
	lastName: string;
}
