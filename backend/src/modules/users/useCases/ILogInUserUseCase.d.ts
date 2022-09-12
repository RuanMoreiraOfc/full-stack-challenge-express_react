import type { IUserCredentialsDTO } from '@users/repositories/IUserRepository';

export type { ILogInUserUseCase };

interface IResponse {
  id: string;
  name: string;
  token: string;
}

interface ILogInUserUseCase {
  execute(data: IUserCredentialsDTO): Promise<IResponse>;
}
