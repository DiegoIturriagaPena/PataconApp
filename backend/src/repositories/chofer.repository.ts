import {DefaultCrudRepository} from '@loopback/repository';
import {Chofer} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ChoferRepository extends DefaultCrudRepository<
  Chofer,
  typeof Chofer.prototype.rut
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Chofer, dataSource);
  }
}
