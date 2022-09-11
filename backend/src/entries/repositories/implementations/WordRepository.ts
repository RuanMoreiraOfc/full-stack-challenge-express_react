import { PrismaClient } from '@prisma/client';

import { Word } from '@entries/models/Word';
import type {
  IWordPaginationDTO,
  IWordRepository,
} from '@entries/repositories/IWordRepository';

export { WordRepository };

class WordRepository implements IWordRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async list({ search, limit }: IWordPaginationDTO) {
    const wordsFromDb = await this.prisma.word.findMany({
      take: limit,
      orderBy: {
        value: 'asc',
      },
      where: {
        value: {
          startsWith: search,
        },
      },
    });

    const words = wordsFromDb.map((word) => new Word(word));

    return words;
  }
}
