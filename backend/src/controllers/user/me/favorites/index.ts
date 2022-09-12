import { UserWordRepository } from '@entries/repositories/implementations/UserWordRepository';
import { ListFavoriteUsersWordsUseCase } from '@entries/useCases/implementations/ListFavoriteUsersWordsUseCase';
import { ListFavoriteUsersWordsController } from '@controllers/user/me/favorites/ListFavoriteUsersWordsController';

export { controller as ListFavoriteUsersWordsController };

const repository = new UserWordRepository();
const useCase = new ListFavoriteUsersWordsUseCase(repository);
const controller = new ListFavoriteUsersWordsController(useCase);
