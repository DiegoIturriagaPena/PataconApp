import { belongsTo, Model, model, property, Entity } from '@loopback/repository';
import { Vina } from './vina.model';
@model({ settings: { strict: false } })
export class Ruta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_ruta?: number;

  @property({
    type: 'number',
    dataType: 'decimal',
    precision: 20,
    scale: 15,
    required: true,
  })
  longitud_inicio: number;

  @property({
    type: 'number',
    dataType: 'decimal',
    precision: 20,
    scale: 15,
    required: true,
  })
  latitud_inicio: number;

  @property({
    type: 'number',
    dataType: 'decimal',
    precision: 20,
    scale: 15,
    required: true,
  })
  longitud_destino: number;

  @property({
    type: 'number',
    dataType: 'decimal',
    precision: 20,
    scale: 15,
    required: true,
  })
  latitud_destino: number;

  @property({
    type: 'string',
    required: true,
    default: "[]"
  })
  waypoints: string;
  @property({
    type: 'string',
    required: true,
  })
  duracion_aprox: string;

  // Define well-known properties here
  @belongsTo(() => Vina)
  ref_vinna?: number;
  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Ruta>) {
    super(data);
  }
}
