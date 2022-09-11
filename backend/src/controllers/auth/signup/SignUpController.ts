import type { Request, Response } from 'express';

import { ICreateUserUseCase } from '@users/useCases/ICreateUserUseCase';

export { SignUpController };

class SignUpController {
  constructor(private useCase: ICreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const user = await this.useCase.execute({
      name,
      email,
      password,
    });

    response.status(201).json({
      id: user.id,
      name: user.name,
    });
  }
}
