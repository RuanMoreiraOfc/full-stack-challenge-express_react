export type { IShowUserProfileUseCase, IShowUserProfileUseCaseResponse };

interface IShowUserProfileUseCaseResponse {
  id: string;
  name: string;
  email: string;
}

interface IShowUserProfileUseCase {
  execute(id: string): Promise<IShowUserProfileUseCaseResponse>;
}
