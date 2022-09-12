import { AppError } from '@errors/AppError';

import type { IUserRepository } from '@users/repositories/IUserRepository';
import type {
  IShowUserProfileUseCase,
  IShowUserProfileUseCaseResponse,
} from '@users/useCases/IShowUserProfileUseCase';

export { ShowUserProfileUseCase };

class ShowUserProfileUseCase implements IShowUserProfileUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(id: string): Promise<IShowUserProfileUseCaseResponse> {
    const user = await this.repository.show(id);

    if (!user) {
      throw new AppError({ message: 'User not found!', statusCode: 404 });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
