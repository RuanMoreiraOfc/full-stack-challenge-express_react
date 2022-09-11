import type { Request, Response } from 'express';
import { default as proxyResolver } from 'request';

import getEnv from '@utils/getEnv';
import verifyToken from '@utils/verifyToken';

import type { IViewUserWordUseCase } from '@entries/useCases/IViewUserWordUseCase';

export { ViewUserWordController };

class ViewUserWordController {
  constructor(private useCase: IViewUserWordUseCase) {}

  async handle(request: Request, response: Response) {
    const { word } = request.params;
    const user_id = verifyToken(request);

    await this.useCase.execute({
      word,
      user_id,
    });

    const URL_PROXY = `${getEnv('DICTIONARY_API_ENDPOINT', 'string')}/${word}`;
    proxyResolver(URL_PROXY).pipe(response);
  }
}
