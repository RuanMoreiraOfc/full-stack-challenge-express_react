import type { ICreateUserDTO } from '@users/repositories/IUserRepository';

export type { ICreateUserUseCase, ICreateUserUseCaseResponse };

interface ICreateUserUseCaseResponse {
  id: string;
  name: string;
  token: string;
}

interface ICreateUserUseCase {
  execute(data: ICreateUserDTO): Promise<ICreateUserUseCaseResponse>;
}
