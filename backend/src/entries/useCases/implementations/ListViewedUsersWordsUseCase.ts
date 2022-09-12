import type {
  IUserWordPaginationDTO,
  IUserWordRepository,
} from '@entries/repositories/IUserWordRepository';
import type {
  IListViewedUsersWordsUseCase,
  IListViewedUsersWordsUseCaseResponse,
} from '@entries/useCases/IListViewedUsersWordsUseCase';

export { ListViewedUsersWordsUseCase };

class ListViewedUsersWordsUseCase implements IListViewedUsersWordsUseCase {
  constructor(private repository: IUserWordRepository) {}

  async execute({
    user_id,
    viewed,
    limit,
    page,
  }: IUserWordPaginationDTO): Promise<IListViewedUsersWordsUseCaseResponse> {
    const totalDocs = await this.repository.count({
      user_id,
      viewed,
    });
    const totalPages = Math.ceil(totalDocs / limit);
    const hasNext = page < Math.ceil(totalDocs / limit);
    const hasPrev = page > 1;

    // ***

    const results = await this.repository.list({
      user_id,
      viewed,
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
