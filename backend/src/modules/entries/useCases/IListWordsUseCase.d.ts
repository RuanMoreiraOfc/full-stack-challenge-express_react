import type { IWordPaginationDTO } from '@entries/repositories/IWordRepository';

export type { IListWordsUseCase, IListWordsUseCaseResponse };

interface IListWordsUseCaseResponse {
  results: string[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface IListWordsUseCase {
  execute(data: IWordPaginationDTO): Promise<IListWordsUseCaseResponse>;
}
