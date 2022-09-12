export type { IViewUserWordUseCase, IInput as IViewUserWordUseCaseInput };

interface IInput {
  word: string;
  user_id: string;
}

interface IViewUserWordUseCase {
  execute(data: IInput): Promise<void>;
}
