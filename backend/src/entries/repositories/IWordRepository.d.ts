import type { IWord } from '@entries/models/Word';

export type { IWordPaginationDTO, IWordRepository };

interface IWordPaginationDTO {
  search?: string;
  limit: number;
}

interface IWordRepository {
  list(data: IWordPaginationDTO): Promise<IWord[]>;
}
