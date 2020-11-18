import { model, property, Entity, hasMany } from '@loopback/repository';
import { Vina } from './vina.model';
@model({ settings: { strict: false } })
export class Productor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_productor?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  rut: string;

  @property({
    type: 'string',
  })
  apellidos?: string;

  @property({
    type: 'string',
  })
  cosecha?: string;

  @property({
    type: 'string',
  })
  variedad?: string;

  @property({
    type: 'string',
  })
  calidad?: string;


  @property({
    type: 'string',
    default: ''
  })
  direccion?: string;

  @property({
    type: 'string',
  })
  razon_social?: string;

  @property({
    type: 'number',
    required: true,
  })
  telefono: number;

  @property({
    type: 'number',
  })
  telefono2?: number;

  @property({
    type: 'boolean',
    default: true
  })
  disponible?: boolean;

  @hasMany(() => Vina, { keyTo: 'productorId' })
  vinas?: Vina[];

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Productor>) {
    super(data);
  }
}
