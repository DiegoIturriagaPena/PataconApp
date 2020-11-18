import {DefaultCrudRepository} from '@loopback/repository';
import {VinaTipouva} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VinaTipouvaRepository extends DefaultCrudRepository<
  VinaTipouva,
  typeof VinaTipouva.prototype.tipovina_id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(VinaTipouva, dataSource);
  }
}
