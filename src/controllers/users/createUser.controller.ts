import { FastifyReply } from "fastify";
import { IUserInteractor } from "../../interactors/users/user.interactor.interface";
import { ResponseModel } from "../../models/response/response.model.ts";
import { IUserController } from "./user.controller.interface";

export class CreateUserController implements IUserController {
  constructor(
    private interactor: IUserInteractor,
    private reply: FastifyReply,
  ) {}

  async handle(): Promise<void> {
    const result = await this.interactor.execute();
    const response = new ResponseModel(result);
    this.reply
      .code(response.statusCode)
      .send(response.toPlainObject());
  }
}