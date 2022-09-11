import type { Request, Response } from 'express';

import type { ICreateUserUseCase } from '@users/useCases/ICreateUserUseCase';

export { SignUpController };

class SignUpController {
  constructor(private useCase: ICreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const json = await this.useCase.execute({
      name,
      email,
      password,
    });

    response.status(201).json(json);
  }
}
