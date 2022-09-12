export type {
  IChangeFavoriteUserWordUseCase,
  IInput as IChangeFavoriteUserWordUseCaseInput,
};

interface IInput {
  state: boolean;
  word: string;
  user_id: string;
}

interface IChangeFavoriteUserWordUseCase {
  execute(data: IInput): Promise<void>;
}
