import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AdminRegisterGuard implements CanActivate {
	constructor(private configService: ConfigService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const adminCode = request.headers[this.configService.getOrThrow('ADMIN_HEADER')]

		if (adminCode !== this.configService.getOrThrow('ADMIN_SECRET')) {
			throw new UnauthorizedException('Invalid admin code')
		}

		return true;
	}
}
