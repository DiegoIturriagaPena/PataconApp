import { DefaultCrudRepository } from '@loopback/repository';
import { Usuario } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.rut
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Usuario, dataSource);
  }
}
