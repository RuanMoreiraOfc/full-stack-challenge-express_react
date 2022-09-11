import {
  ICreateUserDTO,
  IUserRepository,
} from '@users/repositories/IUserRepository';
import { ICreateUserUseCase } from '@users/useCases/ICreateUserUseCase';

export { CreateUserUseCase };

class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.repository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const user = await this.repository.create(data);

    return user;
  }
}
