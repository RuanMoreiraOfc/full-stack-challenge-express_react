import { compare } from 'bcrypt';

import generateToken from '@utils/generateToken';

import { AppError } from '@errors/AppError';

import type {
  IUserCredentialsDTO,
  IUserRepository,
} from '@users/repositories/IUserRepository';
import type { ILogInUserUseCase } from '@users/useCases/ILogInUserUseCase';

export { LogInUserUseCase };

class LogInUserUseCase implements ILogInUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute({ email, password }: IUserCredentialsDTO) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError({
        message: 'Email or password incorrect!',
        statusCode: 400,
      });
    }

    const isPasswordCorrect = await compare(password, user.password_hash);

    if (!isPasswordCorrect) {
      throw new AppError({
        message: 'Email or password incorrect!',
        statusCode: 400,
      });
    }

    const token = generateToken({ subject: user.id });

    return {
      id: user.id,
      name: user.name,
      token,
    };
  }
}
