import type { Word as WordBase } from '@prisma/client';

export { Word };
export type { IWord };

interface IWord extends WordBase {}

class Word implements IWord {
  constructor(private data: IWord) {}

  get id() {
    return this.data.id;
  }

  get value() {
    return this.data.value;
  }

  get created_at() {
    return this.data.created_at;
  }
}
