import type { IUserWord } from '@entries/models/UserWord';

export type { IFindByUserWordDTO, IUserWordRepository };

interface IFindByUserWordDTO {
  user_id: string;
  word_id: string;
}

interface IUserWordRepository {
  findByUserWord(data: IFindByUserWordDTO): Promise<IUserWord | null>;
}
