import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormInterestsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.formInterest.findMany();
  }

  delete(userId: string, interestId: string) {
    return this.prismaService.formInterest.delete({ where: { userIdInterestId: { userId, interestId } } });
  }
}
