import {DefaultCrudRepository} from '@loopback/repository';
import {Rol} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Rol, dataSource);
  }
}
