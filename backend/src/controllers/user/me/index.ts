import { UserRepository } from '@users/repositories/implementations/UserRepository';
import { ShowUserProfileUseCase } from '@users/useCases/implementations/ShowUserProfileUseCase';
import { ShowUserProfileController } from '@controllers/user/me/ShowUserProfileController';

export { controller as ShowUserProfileController };

const repository = new UserRepository();
const useCase = new ShowUserProfileUseCase(repository);
const controller = new ShowUserProfileController(useCase);
