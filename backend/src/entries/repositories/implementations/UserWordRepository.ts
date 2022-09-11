import { PrismaClient } from '@prisma/client';
import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';

import { UserWord } from '@entries/models/UserWord';
import type {
  ISetStateUserWordDTO,
  IChangeStateUserWordDTO,
  IFindByUserWordDTO,
  IUserWordRepository,
} from '@entries/repositories/IUserWordRepository';

export { UserWordRepository };

class UserWordRepository implements IUserWordRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = PrismaClientSingleton.getInstance().client;
  }

  async setViewedState({ user_id, word_id }: ISetStateUserWordDTO) {
    await this.prisma.userWord.create({
      data: {
        viewed: true,
        favorite: false,
        User: {
          connect: { id: user_id },
        },
        Word: {
          connect: { id: word_id },
        },
      },
    });
  }

  async changeFavoriteState({
    state,
    id,
    user_id,
    word_id,
  }: IChangeStateUserWordDTO) {
    await this.prisma.userWord.upsert({
      create: {
        viewed: true,
        favorite: state,
        User: {
          connect: { id: user_id },
        },
        Word: {
          connect: { id: word_id },
        },
      },
      update: {
        favorite: state,
      },
      where: {
        id,
      },
    });
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
