import type { Request, Response } from 'express';

import getUserIdFromToken from '@utils/getUserIdFromToken';

import type { IListViewedUsersWordsUseCase } from '@entries/useCases/IListViewedUsersWordsUseCase';

export { ListViewedUsersWordsController };

class ListViewedUsersWordsController {
  constructor(private useCase: IListViewedUsersWordsUseCase) {}

  async handle(request: Request, response: Response) {
    const { page, limit } = request.query;
    const user_id = getUserIdFromToken(request);

    const json = await this.useCase.execute({
      user_id,
      viewed: true,
      page: Number(page) || 1,
      limit: Number(limit) || 20,
    });

    response.json(json);
  }
}
