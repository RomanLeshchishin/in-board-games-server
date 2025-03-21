import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Role} from "@prisma/client";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<Role[]>('roles', context.getHandler());

		if (!roles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		const hasRole = roles.some((role) => role === user.role);
		if (!hasRole) {
			throw new ForbiddenException();
		}

		return true;
	}
}
