import * as express from 'express';
import { injectable } from 'inversify';
import { IRouterController } from '../IRouterController';

@injectable()
export class OrderManagementController implements IRouterController {
  public readonly router: express.Router;

  private path = '/OrderManagement';

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get`, this.get);
    this.router.post(`${this.path}/post`, this.post);
  }

  private get = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      response.json({});
    } catch (error) {
      next(error);
    }
  };

  private post = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      response.json({});
    } catch (error) {
      next(error);
    }
  };
}
