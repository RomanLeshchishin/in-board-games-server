import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import { Request } from 'express';
import {UsersService} from "../../users/users.service";
import {ConfigService} from "@nestjs/config";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

	constructor(private usersService: UsersService, private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
				return request?.cookies?.Refresh;
			}]),
			secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
			passReqToCallback: true,
		});
	}

	async validate(payload: { userId: string }) {
		const user = await this.usersService.findById(payload.userId)

		if (!user) {
			return new UnauthorizedException();
		}

		return payload;
	}
}
