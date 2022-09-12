import type { IUserWord } from '@entries/models/UserWord';

export type {
  ISetStateUserWordDTO,
  IChangeStateUserWordDTO,
  IUserWordMainInfo,
  IUserWordPaginationSearchDTO,
  IUserWordPaginationDTO,
  IFindByUserWordDTO,
  IUserWordRepository,
};

interface ISetStateUserWordDTO {
  user_id: string;
  word_id: string;
}

interface IChangeStateUserWordDTO extends ISetStateUserWordDTO {
  id: string;
  state: boolean;
}

interface IUserWordMainInfo {
  word: string;
  added: Date;
}

interface IUserWordPaginationSearchDTO {
  user_id: string;
  viewed?: boolean;
  favorite?: boolean;
}

interface IUserWordPaginationDTO extends IUserWordPaginationSearchDTO {
  page: number;
  limit: number;
}

interface IFindByUserWordDTO {
  user_id: string;
  word_id: string;
}

interface IUserWordRepository {
  setViewedState(data: ISetStateUserWordDTO): Promise<void>;
  changeFavoriteState(data: IChangeStateUserWordDTO): Promise<void>;
  count(data: IUserWordPaginationSearchDTO): Promise<number>;
  list(data: IUserWordPaginationDTO): Promise<IUserWordMainInfo[]>;
  findByUserWord(data: IFindByUserWordDTO): Promise<IUserWord | null>;
}
