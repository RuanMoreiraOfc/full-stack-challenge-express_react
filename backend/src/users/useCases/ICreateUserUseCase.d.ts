import { IUser } from '@users/models/User';
import { ICreateUserDTO } from '@users/repositories/IUserRepository';

export type { ICreateUserUseCase };

interface ICreateUserUseCase {
  execute(data: ICreateUserDTO): Promise<IUser>;
}
