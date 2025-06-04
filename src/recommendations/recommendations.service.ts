import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Form, FormModel } from '@prisma/client';

type FormWithModels = Form & {
  models: FormModel[];
};

@Injectable()
export class RecommendationsService {
  constructor(private prismaService: PrismaService) {}

  async getRecommendations(userId: string) {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });

    const userForm = await this.prismaService.form.findUnique({
      where: { userId },
      include: {
        models: true,
        profile: true,
      },
    });

    if (!userForm) {
      throw new Error('Форма не найдена');
    }

    const allForms = await this.prismaService.form.findMany({
      where: {
        NOT: { userId },
        blockedAt: null,
        freezeAt: null,
      },
      include: {
        models: true,
        profile: true,
      },
    });

    const recommendations = allForms.map(form => {
      const score = this.calculateCompatibility(userForm, form);
      return {
        user,
        profile: form.profile,
        compatibility: score,
      };
    });

    return recommendations.filter(r => r.compatibility >= 0).sort((a, b) => b.compatibility - a.compatibility);
  }

  calculateCompatibility(formA: FormWithModels, formB: FormWithModels): number {
    let total = 0;

    const weights = {
      gender: 5,
      whatDays: 5,
      howOften: 5,
      favoriteTime: 5,
      course: 5,
      direction: 5,
      profession: 5,
      interests: 10,
      topics: 25,
      games: 30,
    };

    if (formA.gender === formB.gender) total += weights.gender;
    if (formA.whatDays === formB.whatDays) total += weights.whatDays;
    if (formA.howOften === formB.howOften) total += weights.howOften;

    const intersect = (a, b) => a.filter(value => b.includes(value)).length;

    const ftA = formA.favoriteTime.map(j => JSON.stringify(j));
    const ftB = formB.favoriteTime.map(j => JSON.stringify(j));
    const ftIntersection = intersect(ftA, ftB);
    if (ftIntersection > 0) {
      total += weights.favoriteTime * (ftIntersection / Math.max(ftA.length, ftB.length));
    }

    if (formA.course && formB.course && Math.abs(formA.course - formB.course) <= 1) total += weights.course;

    if (formA.direction && formA.direction === formB.direction) total += weights.direction;

    if (formA.profession && formA.profession === formB.profession) total += weights.profession;

    const idsByType = (models, type) => models.filter(m => m.modelType === type).map(m => m.modelId);

    const intersectRatio = (a, b) => (a.length && b.length ? intersect(a, b) / Math.max(a.length, b.length) : 0);

    total +=
      weights.interests * intersectRatio(idsByType(formA.models, 'INTEREST'), idsByType(formB.models, 'INTEREST'));

    total += weights.topics * intersectRatio(idsByType(formA.models, 'TOPIC'), idsByType(formB.models, 'TOPIC'));

    total += weights.games * intersectRatio(idsByType(formA.models, 'GAME'), idsByType(formB.models, 'GAME'));

    return Math.round(total);
  }
}
