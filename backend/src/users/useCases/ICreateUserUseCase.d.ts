import type { IUser } from '@users/models/User';
import type { ICreateUserDTO } from '@users/repositories/IUserRepository';

export type { ICreateUserUseCase };

interface ICreateUserUseCase {
  execute(data: ICreateUserDTO): Promise<IUser>;
}
