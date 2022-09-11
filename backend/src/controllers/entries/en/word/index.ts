import { WordRepository } from '@entries/repositories/implementations/WordRepository';
import { UserWordRepository } from '@entries/repositories/implementations/UserWordRepository';
import { ViewUserWordUseCase } from '@entries/useCases/implementations/ViewUserWordUseCase';
import { ViewUserWordController } from '@controllers/entries/en/word/ViewUserWordController';

export { controller as ViewUserWordController };

const wordRepository = new WordRepository();
const relationRepository = new UserWordRepository();
const useCase = new ViewUserWordUseCase(wordRepository, relationRepository);
const controller = new ViewUserWordController(useCase);
