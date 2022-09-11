import { UserRepository } from '@users/repositories/implementations/UserRepository';
import { LogInUserUseCase } from '@users/useCases/implementations/LogInUserUseCase';
import { SignInController } from '@controllers/auth/signin/SignInController';

export { controller as SignInController };

const repository = new UserRepository();
const useCase = new LogInUserUseCase(repository);
const controller = new SignInController(useCase);
