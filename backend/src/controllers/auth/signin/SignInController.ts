import type { Request, Response } from 'express';

import { ILogInUserUseCase } from '@users/useCases/ILogInUserUseCase';

export { SignInController };

class SignInController {
  constructor(private useCase: ILogInUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const json = await this.useCase.execute({
      email,
      password,
    });

    response.status(201).json(json);
  }
}
