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

  async execute(data: IWordPaginationDTO): Promise<IListWordsUseCaseResponse> {
    const words = await this.repository.list(data);
    const wordValues = words.map(({ value }) => value);

    return {
      results: wordValues,
      totalDocs: wordValues.length,
      page: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    };
  }
}
