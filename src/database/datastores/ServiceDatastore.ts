import { inject, injectable } from 'inversify';
import { Connection, EntityManager } from 'typeorm';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { IServiceDatastore } from './ServiceDatastore.interface';
import { Service } from '../entities/Service';
import { IDatabaseConnection } from '../instances/DatabaseConnection.interface';

@injectable()
export class ServiceDatastore implements IServiceDatastore {
  constructor(
    @inject(INVERSIFY_TYPES.Database)
    private databaseConnection: IDatabaseConnection
  ) {}

  public async saveService(object: Service, transaction?: EntityManager): Promise<Service> {
    const executeQuery = (connection: Connection) => connection.getRepository(Service).save(object);
    if (transaction) {
      return executeQuery(transaction.connection);
    }
    return this.databaseConnection.usingConnection(executeQuery);
  }

  public async deleteService(object: Service, transaction?: EntityManager): Promise<void> {
    const executeQuery = (connection: Connection) =>
      connection
        .createQueryBuilder()
        .delete()
        .from(Service)
        .where('id = :id', {
          id: object.id,
        })
        .execute();
    if (transaction) {
      executeQuery(transaction.connection);
    } else {
      this.databaseConnection.usingConnection(executeQuery);
    }
  }

  public async getService(objectId: string, transaction?: EntityManager): Promise<Service | null> {
    const executeQuery = (connection: Connection) =>
      connection
        .getRepository(Service)
        .createQueryBuilder('Service')
        .where('Service.id = :id', { id: objectId })
        .getOne();
    if (transaction) {
      return executeQuery(transaction.connection);
    }

    return this.databaseConnection.usingConnection(executeQuery);
  }

  public async getServices(offset: number, limit: number, transaction?: EntityManager): Promise<[Service[], number]> {
    const executeQuery = (connection: Connection) =>
      connection.getRepository(Service).createQueryBuilder('Service').skip(offset).take(limit).getManyAndCount();
    if (transaction) {
      return executeQuery(transaction.connection);
    }

    return this.databaseConnection.usingConnection(executeQuery);
  }
}
