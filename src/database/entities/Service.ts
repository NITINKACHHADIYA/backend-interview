import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Service')
export class Service {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  public id: string;
}
