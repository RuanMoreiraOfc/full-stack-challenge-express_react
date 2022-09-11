import { IUser } from '@users/models/User';

export type { IUserRepository };

interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
