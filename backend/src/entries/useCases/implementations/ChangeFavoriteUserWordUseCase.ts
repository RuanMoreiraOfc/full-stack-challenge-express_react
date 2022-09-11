import { AppError } from '@errors/AppError';

import type { IWordRepository } from '@entries/repositories/IWordRepository';
import type { IUserWordRepository } from '@entries/repositories/IUserWordRepository';
import type {
  IChangeFavoriteUserWordUseCase,
  IChangeFavoriteUserWordUseCaseInput,
} from '@entries/useCases/IChangeFavoriteUserWordUseCase';

export { ChangeFavoriteUserWordUseCase };

class ChangeFavoriteUserWordUseCase implements IChangeFavoriteUserWordUseCase {
  constructor(
    private wordRepository: IWordRepository,
    private relationRepository: IUserWordRepository,
  ) {}

  async execute({
    state,
    word: value,
    user_id,
  }: IChangeFavoriteUserWordUseCaseInput) {
    const word = await this.wordRepository.findByValue(value);

    if (!word) {
      throw new AppError({ message: 'Word not found!', statusCode: 404 });
    }

    const word_id = word.id;

    const relation = await this.relationRepository.findByUserWord({
      user_id,
      word_id,
    });

    await this.relationRepository.changeFavoriteState({
      state,
      id: relation?.id ?? '',
      user_id,
      word_id,
    });
  }
}
