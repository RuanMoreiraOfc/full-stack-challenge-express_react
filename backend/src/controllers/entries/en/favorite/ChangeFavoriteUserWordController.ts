import type { Request, Response } from 'express';

import verifyToken from '@utils/verifyToken';

import type { IChangeFavoriteUserWordUseCase } from '@entries/useCases/IChangeFavoriteUserWordUseCase';

export { ChangeFavoriteUserWordController };

class ChangeFavoriteUserWordController {
  constructor(private useCase: IChangeFavoriteUserWordUseCase) {}

  async handle(request: Request, response: Response) {
    const { word } = request.params;
    const state = request.method === 'DELETE';
    const user_id = await verifyToken(request);

    await this.useCase.execute({
      state,
      word,
      user_id,
    });

    response.status(204).end();
  }
}
