export type {
  IShowUserProfileUseCase,
  IResponse as IShowUserProfileUseCaseResponse,
};

interface IResponse {
  id: string;
  name: string;
  email: string;
}

interface IShowUserProfileUseCase {
  execute(id: string): Promise<IResponse>;
}
