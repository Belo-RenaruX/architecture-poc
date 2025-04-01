import { ErrorModel } from 'src/models/errors/error.model.ts';
import { ResponseModel } from 'src/models/response/response.model.ts';

import { IResponseStrategy } from './strategies/response.strategy.interface.ts';

export interface IResponseInteractor<TModel> {
  execute(model: TModel | ErrorModel): ResponseModel<TModel>;
}

export class ResponseInteractor<T> implements IResponseInteractor<T> {
  constructor(private readonly strategy: IResponseStrategy) {}

  public execute = (model: T | ErrorModel): ResponseModel<T> => {
    try {
      const response = new ResponseModel<T>(model);
      const schema = this.strategy.getSchema();
      schema.parse(response.toPlainObject());
      return response;
    } catch (error) {
      const parsingError = ErrorModel.fromError(error);
      return new ResponseModel<T>(parsingError);
    }
  };
}
