import { DefaultCrudRepository } from '@loopback/repository';
import { Productor } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ProductorRepository extends DefaultCrudRepository<
  Productor,
  typeof Productor.prototype.id_productor
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Productor, dataSource);
  }
}
