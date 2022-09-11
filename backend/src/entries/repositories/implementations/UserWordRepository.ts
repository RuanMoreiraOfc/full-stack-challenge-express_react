import { PrismaClient } from '@prisma/client';

import { UserWord } from '@entries/models/UserWord';
import type {
  IFindByUserWordDTO,
  IUserWordRepository,
} from '@entries/repositories/IUserWordRepository';

export { UserWordRepository };

class UserWordRepository implements IUserWordRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByUserWord({ user_id, word_id }: IFindByUserWordDTO) {
    const relationFromDb = await this.prisma.userWord.findFirst({
      where: {
        user_id,
        word_id,
      },
    });

    const relation =
      relationFromDb === null //
        ? null
        : new UserWord(relationFromDb);

    return relation;
  }
}
