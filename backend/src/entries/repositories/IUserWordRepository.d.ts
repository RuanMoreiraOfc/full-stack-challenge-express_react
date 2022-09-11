import type { IUserWord } from '@entries/models/UserWord';

export type {
  IChangeStateUserWordDTO,
  IFindByUserWordDTO,
  IUserWordRepository,
};

interface IChangeStateUserWordDTO {
  state: boolean;
  id: string;
  user_id: string;
  word_id: string;
}

interface IFindByUserWordDTO {
  user_id: string;
  word_id: string;
}

interface IUserWordRepository {
  changeFavoriteState(data: IChangeStateUserWordDTO): Promise<void>;
  findByUserWord(data: IFindByUserWordDTO): Promise<IUserWord | null>;
}
