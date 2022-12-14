import type { IUserWord } from '@entries/models/UserWord';
import type {
  IUserWordMainInfo,
  IUserWordPaginationDTO,
} from '@entries/repositories/IUserWordRepository';

export type {
  IListFavoriteUsersWordsUseCase,
  IListFavoriteUsersWordsUseCaseResponse,
};

interface IListFavoriteUsersWordsUseCaseResponse {
  results: IUserWordMainInfo[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface IListFavoriteUsersWordsUseCase {
  execute(
    data: IUserWordPaginationDTO,
  ): Promise<IListFavoriteUsersWordsUseCaseResponse>;
}
