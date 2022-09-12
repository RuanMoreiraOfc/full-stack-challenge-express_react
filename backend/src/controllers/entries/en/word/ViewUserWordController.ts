import type { Request, Response } from 'express';
import axios from 'axios';

import getEnv from '@utils/getEnv';
import getUserIdFromToken from '@utils/getUserIdFromToken';

import type { IViewUserWordUseCase } from '@entries/useCases/IViewUserWordUseCase';

export { ViewUserWordController };

class ViewUserWordController {
  constructor(private useCase: IViewUserWordUseCase) {}

  async handle(request: Request, response: Response) {
    const { word } = request.params;
    const user_id = getUserIdFromToken(request);

    await this.useCase.execute({
      word,
      user_id,
    });

    const URL = `${getEnv('DICTIONARY_API_ENDPOINT', 'string')}/${word}`;
    const apiResponse = await axios.get(URL);
    return response.json(apiResponse.data);
  }
}
