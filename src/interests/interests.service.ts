import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MFile } from '../files/MFile.class';
import { InterestEntity } from './entity/interest.entity';
import { InterestManyEntity } from './entity/interest-many.entity';

@Injectable()
export class InterestsService {
  constructor(private prismaService: PrismaService) {}

  create(createInterestDto: CreateInterestDto): Promise<InterestEntity> {
    return this.prismaService.interest.create({ data: createInterestDto });
  }

  async createMany(file: MFile): Promise<InterestManyEntity> {
    const lines = file.buffer.toString().split('\n');
    let savedInterests = 0;

    for (const line of lines) {
      if (!line.trim()) continue; // Пропускаем пустые строки

      try {
        const [title, area] = line.split(';').map(f => f.trim());
        await this.prismaService.interest.create({ data: { title, area } });
        savedInterests++;
      } catch (error) {
        console.error(`Error processing line: ${line}`, error);
      }
    }

    return { savedInterests };
  }

  findAll(): Promise<InterestEntity[]> {
    return this.prismaService.interest.findMany();
  }

  findById(id: string): Promise<InterestEntity | null> {
    return this.prismaService.interest.findUnique({ where: { id } });
  }

  update(id: string, updateInterestDto: Partial<CreateInterestDto>): Promise<InterestEntity> {
    return this.prismaService.interest.update({ where: { id }, data: updateInterestDto });
  }

  delete(id: string): Promise<InterestEntity> {
    return this.prismaService.interest.delete({ where: { id } });
  }
}
