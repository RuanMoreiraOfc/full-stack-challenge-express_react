import { WordRepository } from '@entries/repositories/implementations/WordRepository';
import { UserWordRepository } from '@entries/repositories/implementations/UserWordRepository';
import { ChangeFavoriteUserWordUseCase } from '@entries/useCases/implementations/ChangeFavoriteUserWordUseCase';
import { ChangeFavoriteUserWordController } from '@controllers/entries/en/favorite/ChangeFavoriteUserWordController';

export { controller as ChangeFavoriteUserWordController };

const wordRepository = new WordRepository();
const relationRepository = new UserWordRepository();
const useCase = new ChangeFavoriteUserWordUseCase(
  wordRepository,
  relationRepository,
);
const controller = new ChangeFavoriteUserWordController(useCase);
