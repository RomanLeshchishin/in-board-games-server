import { Controller } from '@nestjs/common';
import { FormTopicsService } from './form-topics.service';

@Controller('form-topics')
export class FormTopicsController {
  constructor(private readonly formTopicsService: FormTopicsService) {}
}
