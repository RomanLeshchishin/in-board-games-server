import { Controller } from '@nestjs/common';
import { FormGamesService } from './form-games.service';

@Controller('form-games')
export class FormGamesController {
  constructor(private readonly formGamesService: FormGamesService) {}
}
