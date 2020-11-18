import {DefaultCrudRepository} from '@loopback/repository';
import {TipoUva} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TipoUvaRepository extends DefaultCrudRepository<
  TipoUva,
  typeof TipoUva.prototype.id_tipo_uva
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TipoUva, dataSource);
  }
}
