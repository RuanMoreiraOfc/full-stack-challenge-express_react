import { UserWordRepository } from '@entries/repositories/implementations/UserWordRepository';
import { ListViewedUsersWordsUseCase } from '@entries/useCases/implementations/ListViewedUsersWordsUseCase';
import { ListViewedUsersWordsController } from '@controllers/user/me/history/ListViewedUsersWordsController';

export { controller as ListViewedUsersWordsController };

const repository = new UserWordRepository();
const useCase = new ListViewedUsersWordsUseCase(repository);
const controller = new ListViewedUsersWordsController(useCase);
