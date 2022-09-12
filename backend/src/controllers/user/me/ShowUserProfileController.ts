import type { Request, Response } from 'express';

import getUserIdFromToken from '@utils/getUserIdFromToken';

import type { IShowUserProfileUseCase } from '@users/useCases/IShowUserProfileUseCase';

export { ShowUserProfileController };

class ShowUserProfileController {
  constructor(private useCase: IShowUserProfileUseCase) {}

  async handle(request: Request, response: Response) {
    const user_id = getUserIdFromToken(request);

    const json = await this.useCase.execute(user_id);

    response.json(json);
  }
}
