import type { IListWordsDTO } from '@users/repositories/IWordRepository';

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
  execute(data: IListWordsDTO): Promise<IResponse>;
}
