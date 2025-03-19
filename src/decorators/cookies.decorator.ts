import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const Cookies = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const cookies = request.headers.cookie;
		if (cookies) {
			return cookies.split('=')[1].trim();
		}
		return null;
	},
);
