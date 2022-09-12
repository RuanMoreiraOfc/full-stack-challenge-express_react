import type { Request, Response } from 'express';

import verifyToken from '@utils/verifyToken';

import type { IListFavoriteUsersWordsUseCase } from '@entries/useCases/IListFavoriteUsersWordsUseCase';

export { ListFavoriteUsersWordsController };

class ListFavoriteUsersWordsController {
  constructor(private useCase: IListFavoriteUsersWordsUseCase) {}

  async handle(request: Request, response: Response) {
    const { page, limit } = request.query;
    const user_id = verifyToken(request);

    const json = await this.useCase.execute({
      user_id,
      favorite: true,
      page: Number(page) || 1,
      limit: Number(limit) || 20,
    });

    response.json(json);
  }
}
