import { Controller } from '@nestjs/common';
import { FormInterestsService } from './form-interests.service';

@Controller('form-interests')
export class FormInterestsController {
  constructor(private readonly formInterestsService: FormInterestsService) {}
}
