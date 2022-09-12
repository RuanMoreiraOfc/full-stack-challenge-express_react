import type {
  IUserWordPaginationDTO,
  IUserWordRepository,
} from '@entries/repositories/IUserWordRepository';
import type {
  IListFavoriteUsersWordsUseCase,
  IListFavoriteUsersWordsUseCaseResponse,
} from '@entries/useCases/IListFavoriteUsersWordsUseCase';

export { ListFavoriteUsersWordsUseCase };

class ListFavoriteUsersWordsUseCase implements IListFavoriteUsersWordsUseCase {
  constructor(private repository: IUserWordRepository) {}

  async execute({
    user_id,
    favorite,
    limit,
    page,
  }: IUserWordPaginationDTO): Promise<IListFavoriteUsersWordsUseCaseResponse> {
    const totalDocs = await this.repository.count({
      user_id,
      favorite,
    });
    const totalPages = Math.ceil(totalDocs / limit);
    const hasNext = page < Math.ceil(totalDocs / limit);
    const hasPrev = page > 1;

    // ***

    const results = await this.repository.list({
      user_id,
      favorite,
      page,
      limit,
    });

    return {
      results,
      totalDocs,
      page: Number(page),
      totalPages,
      hasNext,
      hasPrev,
    };
  }
}
