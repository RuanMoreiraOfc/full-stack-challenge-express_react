import { AppError } from '@errors/AppError';

import type {
  ICreateUserDTO,
  IUserRepository,
} from '@users/repositories/IUserRepository';
import type { ICreateUserUseCase } from '@users/useCases/ICreateUserUseCase';

export { CreateUserUseCase };

class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.repository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError({ message: 'User already exists!', statusCode: 409 });
    }

    const user = await this.repository.create(data);

    return user;
  }
}
