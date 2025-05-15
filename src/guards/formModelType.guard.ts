import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FilterFormModelType } from '../filters/enums/filterFormModelType';

@Injectable()
export class FormModelTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const formModelTypes = this.reflector.get<FilterFormModelType[]>('formModelTypes', context.getHandler());

    if (!formModelTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const filters = request.body;

    const hasModelType = filters.every(filter => formModelTypes.includes(filter.modelType));

    if (!hasModelType) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
