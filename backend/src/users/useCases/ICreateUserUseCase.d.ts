import type { ICreateUserDTO } from '@users/repositories/IUserRepository';

export type { ICreateUserUseCase };

interface IResponse {
  id: string;
  name: string;
  token: string;
}

interface ICreateUserUseCase {
  execute(data: ICreateUserDTO): Promise<IResponse>;
}
