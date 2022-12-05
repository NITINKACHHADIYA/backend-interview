import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../Inversify/InversifyTypes';
import { IOrderManagementRepository } from './OrderManagementRepository.interface';
import { ILocalizeService } from '../instances/others/LocalizeService.interface';
import { ILogger } from '../common/logging/Logger.interface';

@injectable()
export class OrderManagementRepository implements IOrderManagementRepository {
  constructor(
    @inject(INVERSIFY_TYPES.LocalizeService)
    private localize: ILocalizeService,
    @inject(INVERSIFY_TYPES.Logger) private logger: ILogger
  ) {}

  public async save(OrderManagement: object | undefined): Promise<void> {

    this.logger.info('Order repository', OrderManagement);
    // eslint-disable-next-line no-empty
    if (this.localize) {}
  }
}
