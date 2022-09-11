import type { Request, Response } from 'express';

import type { IListWordsUseCase } from '@entries/useCases/IListWordsUseCase';

export { ListWordsController };

class ListWordsController {
  constructor(private useCase: IListWordsUseCase) {}

  async handle(request: Request, response: Response) {
    const { search, limit } = request.query;

    const json = await this.useCase.execute({
      search,
      limit,
    });

    response.json(json);
  }
}
