import {Entity, model, property, hasOne} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model({settings: {strict: false}})
export class Rol extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  // Define well-known properties here
  @hasOne(() => Usuario)
  usuario?: Usuario;

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}
