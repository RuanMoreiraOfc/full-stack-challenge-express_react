import type { IWord } from '@entries/models/Word';

export type { IWordPaginationSearchDTO, IWordPaginationDTO, IWordRepository };

interface IWordPaginationSearchDTO {
  search?: string;
}

interface IWordPaginationDTO extends IWordPaginationSearchDTO {
  page: number;
  limit: number;
}

interface IWordRepository {
  findByValue(value: string): Promise<IWord | null>;
  count(data: IWordPaginationSearchDTO): Promise<number>;
  list(data: IWordPaginationDTO): Promise<IWord[]>;
}
