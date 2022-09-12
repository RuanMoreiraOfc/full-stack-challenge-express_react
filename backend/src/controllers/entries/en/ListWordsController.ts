import type { Request, Response } from 'express';

import type { IListWordsUseCase } from '@entries/useCases/IListWordsUseCase';

export { ListWordsController };

class ListWordsController {
  constructor(private useCase: IListWordsUseCase) {}

  async handle(request: Request, response: Response) {
    const { page, search, limit } = request.query;

    const json = await this.useCase.execute({
      page: Number(page) || 1,
      search: search ? String(search) : '',
      limit: Number(limit) || 20,
    });

    response.json(json);
  }
}
