import type { User as UserBase } from '@prisma/client';

export { User };
export type { IUser };

interface IUser extends UserBase {}

class User implements IUser {
  constructor(private data: IUser) {}

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get email() {
    return this.data.email;
  }

  get password_hash() {
    return this.data.password_hash;
  }

  get created_at() {
    return this.data.created_at;
  }
}
