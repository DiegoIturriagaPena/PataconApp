import {DefaultCrudRepository} from '@loopback/repository';
import {Evento} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventoRepository extends DefaultCrudRepository<
  Evento,
  typeof Evento.prototype.id_evento
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Evento, dataSource);
  }
}
