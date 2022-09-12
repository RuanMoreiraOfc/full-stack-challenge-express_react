import type { IUserCredentialsDTO } from '@users/repositories/IUserRepository';

export type { ILogInUserUseCase, ILogInUserUseCaseResponse };

interface ILogInUserUseCaseResponse {
  id: string;
  name: string;
  token: string;
}

interface ILogInUserUseCase {
  execute(data: IUserCredentialsDTO): Promise<ILogInUserUseCaseResponse>;
}
