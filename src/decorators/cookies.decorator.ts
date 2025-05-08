import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const cookieHeader = request.headers.cookie;

  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader
      .split(';')
      .map(cookie => cookie.trim().split('='))
      .map(([key, ...val]) => [key, val.join('=')]), // на случай, если в значении есть "="
  );

  return cookies[data]; // data — это имя куки
});
