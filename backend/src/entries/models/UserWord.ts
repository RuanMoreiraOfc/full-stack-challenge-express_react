import type { UserWord as UserWordBase } from '@prisma/client';

export { UserWord };
export type { IUserWord };

interface IUserWord extends UserWordBase {}

class UserWord implements IUserWord {
  constructor(private data: IUserWord) {}

  get id() {
    return this.data.id;
  }

  get user_id() {
    return this.data.user_id;
  }

  get word_id() {
    return this.data.word_id;
  }

  get favorite() {
    return this.data.favorite;
  }

  get viewed() {
    return this.data.viewed;
  }
}
