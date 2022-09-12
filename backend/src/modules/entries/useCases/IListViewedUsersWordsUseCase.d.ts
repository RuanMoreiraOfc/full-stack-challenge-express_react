import type { IUserWord } from '@entries/models/UserWord';
import type {
  IUserWordMainInfo,
  IUserWordPaginationDTO,
} from '@entries/repositories/IUserWordRepository';

export type {
  IListViewedUsersWordsUseCase,
  IResponse as IListViewedUsersWordsUseCaseResponse,
};

interface IResponse {
  results: IUserWordMainInfo[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface IListViewedUsersWordsUseCase {
  execute(data: IUserWordPaginationDTO): Promise<IResponse>;
}
