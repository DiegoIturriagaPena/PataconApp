import {DefaultCrudRepository} from '@loopback/repository';
import {Recorrido} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RecorridoRepository extends DefaultCrudRepository<
  Recorrido,
  typeof Recorrido.prototype.id_recorrido
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Recorrido, dataSource);
  }
}
