import { UserRepository } from '@users/repositories/implementations/UserRepository';
import { CreateUserUseCase } from '@users/useCases/implementations/CreateUserUseCase';
import { SignUpController } from '@controllers/auth/signup/SignUpController';

export { controller as SignUpController };

const repository = new UserRepository();
const useCase = new CreateUserUseCase(repository);
const controller = new SignUpController(useCase);
