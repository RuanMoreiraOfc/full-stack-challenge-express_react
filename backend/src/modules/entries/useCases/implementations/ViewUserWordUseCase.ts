import { AppError } from '@errors/AppError';

import type { IWordRepository } from '@entries/repositories/IWordRepository';
import type { IUserWordRepository } from '@entries/repositories/IUserWordRepository';
import type {
  IViewUserWordUseCase,
  IViewUserWordUseCaseInput,
} from '@entries/useCases/IViewUserWordUseCase';

export { ViewUserWordUseCase };

class ViewUserWordUseCase implements IViewUserWordUseCase {
  constructor(
    private wordRepository: IWordRepository,
    private relationRepository: IUserWordRepository,
  ) {}

  async execute({ word: value, user_id }: IViewUserWordUseCaseInput) {
    const word = await this.wordRepository.findByValue(value);

    if (!word) {
      throw new AppError({ message: 'Word not found!', statusCode: 404 });
    }

    const word_id = word.id;

    const relation = await this.relationRepository.findByUserWord({
      user_id,
      word_id,
    });

    if (relation) {
      return;
    }

    await this.relationRepository.setViewedState({
      user_id,
      word_id,
    });
  }
}
