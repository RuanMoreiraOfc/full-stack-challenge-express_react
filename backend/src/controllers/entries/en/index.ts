import { WordRepository } from '@entries/repositories/implementations/WordRepository';
import { ListWordsUseCase } from '@entries/useCases/implementations/ListWordsUseCase';
import { ListWordsController } from '@controllers/entries/en/ListWordsController';

export { controller as ListWordsController };

const repository = new WordRepository();
const useCase = new ListWordsUseCase(repository);
const controller = new ListWordsController(useCase);
