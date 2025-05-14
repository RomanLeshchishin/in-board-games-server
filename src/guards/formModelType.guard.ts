import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FilterFormModelType } from '../filters/enums/filterFormModelType';

export class FormModelTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const formModelTypes = this.reflector.get<FilterFormModelType[]>('formModelTypes', context.getHandler());

    if (!formModelTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const requestBody = request.body;

    const hasModelType = requestBody.filters.every(filter => filter.modelType in formModelTypes);

    if (!hasModelType) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
