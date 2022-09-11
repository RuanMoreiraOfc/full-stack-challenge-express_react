import type { IUserWord } from '@entries/models/UserWord';

export type {
  ISetStateUserWordDTO,
  IChangeStateUserWordDTO,
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

interface IFindByUserWordDTO {
  user_id: string;
  word_id: string;
}

interface IUserWordRepository {
  setViewedState(data: ISetStateUserWordDTO): Promise<void>;
  changeFavoriteState(data: IChangeStateUserWordDTO): Promise<void>;
  findByUserWord(data: IFindByUserWordDTO): Promise<IUserWord | null>;
}
