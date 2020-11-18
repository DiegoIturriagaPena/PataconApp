import { belongsTo, Model, model, property, Entity } from '@loopback/repository';
import { Recorrido } from './recorrido.model';
@model({ settings: { strict: false } })
export class Evento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_evento?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  link_mapa: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  tipo?: string;

  @property({
    type: 'number',
    dataType: 'decimal',
    precision: 11,
    scale: 8,
    default: 0.0
  })
  longitud_evento?: number;

  @property({
    type: 'number',
    dataType: 'decimal',
    precision: 10,
    scale: 8,
    default: 0.0
  })
  latitud_evento?: number;

  @belongsTo(() => Recorrido)
  ref_recorrido: number;

  /*@belongsTo(() => Recorrido)
  ref_recorrido: number;*/
  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Evento>) {
    super(data);
  }
}
