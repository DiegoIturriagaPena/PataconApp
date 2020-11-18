import { DefaultCrudRepository } from '@loopback/repository';
import { Gps } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class GpsRepository extends DefaultCrudRepository<
  Gps,
  typeof Gps.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Gps, dataSource);
  }
}
