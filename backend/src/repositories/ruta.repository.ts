import {DefaultCrudRepository} from '@loopback/repository';
import {Ruta} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RutaRepository extends DefaultCrudRepository<
  Ruta,
  typeof Ruta.prototype.id_ruta
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Ruta, dataSource);
  }
}
