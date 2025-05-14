import { SetMetadata } from '@nestjs/common';
import { FilterFormModelType } from '../filters/enums/filterFormModelType';

export const FormModelTypes = (...formModelTypes: FilterFormModelType[]) =>
  SetMetadata('formModelTypes', formModelTypes);
