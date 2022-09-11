import { PrismaClient } from '@prisma/client';
import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';

import { Word } from '@entries/models/Word';
import type {
  IWordPaginationSearchDTO,
  IWordPaginationDTO,
  IWordRepository,
} from '@entries/repositories/IWordRepository';

export { WordRepository };

class WordRepository implements IWordRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = PrismaClientSingleton.getInstance().client;
  }

  async findByValue(value: string) {
    const wordFromDb = await this.prisma.word.findFirst({
      where: {
        value,
      },
    });

    const word =
      wordFromDb === null //
        ? null
        : new Word(wordFromDb);

    return word;
  }

  async count({ search }: IWordPaginationSearchDTO) {
    const countFromDb = await this.prisma.word.count({
      where: {
        value: {
          startsWith: search,
        },
      },
    });

    return countFromDb;
  }

  async list({ page, search, limit }: IWordPaginationDTO) {
    const wordsFromDb = await this.prisma.word.findMany({
      take: limit,
      skip: (page - 1) * limit,
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
