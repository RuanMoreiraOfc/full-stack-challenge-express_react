import type {
  IWordPaginationDTO,
  IWordRepository,
} from '@entries/repositories/IWordRepository';
import type {
  IListWordsUseCase,
  IListWordsUseCaseResponse,
} from '@entries/useCases/IListWordsUseCase';

export { ListWordsUseCase };

class ListWordsUseCase implements IListWordsUseCase {
  constructor(private repository: IWordRepository) {}

  async execute({
    page,
    search,
    limit,
  }: IWordPaginationDTO): Promise<IListWordsUseCaseResponse> {
    const totalDocs = await this.repository.count({ search });
    const totalPages = Math.ceil(totalDocs / limit);
    const hasNext = page < Math.ceil(totalDocs / limit);
    const hasPrev = page > 1;

    // ***

    const words = await this.repository.list({ page, search, limit });
    const results = words.map(({ value }) => value);

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
