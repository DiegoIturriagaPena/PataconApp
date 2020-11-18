import {DefaultCrudRepository} from '@loopback/repository';
import {Camion} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CamionRepository extends DefaultCrudRepository<
  Camion,
  typeof Camion.prototype.patente
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Camion, dataSource);
  }
}
