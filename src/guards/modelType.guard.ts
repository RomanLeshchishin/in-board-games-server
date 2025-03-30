import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModelType } from '@prisma/client';

@Injectable()
export class ModelTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const modelTypes = this.reflector.get<ModelType[]>('modelTypes', context.getHandler());

    if (!modelTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const queryParams = request.query;

    const hasModelType = modelTypes.some(modelType => modelType === queryParams.modelType);
    if (!hasModelType) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
