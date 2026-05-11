import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): { name: string; message: string } {
    return {
      name: 'LearnMate Ghana API',
      message: 'OK',
    };
  }

  async getHealth(): Promise<{
    ok: boolean;
    database: boolean;
  }> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { ok: true, database: true };
    } catch {
      return { ok: false, database: false };
    }
  }
}
