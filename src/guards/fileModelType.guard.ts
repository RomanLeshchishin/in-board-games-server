import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FileModelType } from '@prisma/client';

@Injectable()
export class FileModelTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const fileModelTypes = this.reflector.get<FileModelType[]>('fileModelTypes', context.getHandler());

    if (!fileModelTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const queryParams = request.query;

    const hasModelType = fileModelTypes.some(modelType => modelType === queryParams.modelType);
    if (!hasModelType) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
