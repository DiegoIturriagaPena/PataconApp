import {DefaultCrudRepository} from '@loopback/repository';
import {Vina} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VinaRepository extends DefaultCrudRepository<
  Vina,
  typeof Vina.prototype.id_vina
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Vina, dataSource);
  }
}
