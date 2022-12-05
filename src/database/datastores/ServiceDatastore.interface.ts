import { EntityManager } from 'typeorm';
import { Service } from '../entities/Service';

export interface IServiceDatastore {
  saveService(object: Service, transaction?: EntityManager): Promise<Service>;

  deleteService(object: Service, transaction?: EntityManager): Promise<void>;

  getService(objectId: string, transaction?: EntityManager): Promise<Service | null>;

  getServices(offset: number, limit: number, transaction?: EntityManager): Promise<[Service[], number]>;
}
