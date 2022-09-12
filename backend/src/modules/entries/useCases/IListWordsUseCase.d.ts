import type { IWordPaginationDTO } from '@entries/repositories/IWordRepository';

export type { IListWordsUseCase, IResponse as IListWordsUseCaseResponse };

interface IResponse {
  results: string[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface IListWordsUseCase {
  execute(data: IWordPaginationDTO): Promise<IResponse>;
}
