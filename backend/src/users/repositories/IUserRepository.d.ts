import { IUser } from '@users/models/User';

export type { ICreateUserDTO, IUserRepository };

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
