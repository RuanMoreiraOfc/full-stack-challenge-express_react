import { PrismaClient } from '@prisma/client';
import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';

import { UserWord } from '@entries/models/UserWord';
import type {
  ISetStateUserWordDTO,
  IChangeStateUserWordDTO,
  IFindByUserWordDTO,
  IUserWordRepository,
  IUserWordMainInfo,
  IUserWordPaginationSearchDTO,
  IUserWordPaginationDTO,
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
        favorited_at: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async count({ user_id, favorite, viewed }: IUserWordPaginationSearchDTO) {
    const relationsCountFromDb = await this.prisma.userWord.count({
      where: {
        user_id,
        favorite,
        viewed,
      },
    });

    return relationsCountFromDb;
  }

  async list({
    user_id,
    favorite,
    viewed,
    page,
    limit,
  }: IUserWordPaginationDTO): Promise<IUserWordMainInfo[]> {
    const isFavoriteView = Boolean(favorite);

    const relationsFromDb = await this.prisma.userWord.findMany({
      select: {
        Word: {
          select: {
            value: true,
          },
        },
        viewed_at: true,
        favorited_at: true,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        viewed_at: isFavoriteView ? undefined : 'asc',
        favorited_at: isFavoriteView ? 'asc' : undefined,
      },
      where: {
        user_id,
        favorite,
        viewed,
      },
    });

    const relations = relationsFromDb.map((relation) => ({
      word: relation.Word!.value,
      added: isFavoriteView ? relation.favorited_at : relation.viewed_at,
    }));

    return relations;
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
