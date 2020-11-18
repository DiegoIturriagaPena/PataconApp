import { belongsTo, Model, model, property, Entity } from '@loopback/repository';
import { Chofer } from './chofer.model';
import { Ruta } from './ruta.model';
import { Camion } from './camion.model';
@model({ settings: { strict: false } })
export class Recorrido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_recorrido?: number;

  @property({
    type: 'string',
  })
  tipo_carga?: string;

  @property({
    type: 'string',
  })
  envase?: string;

  @property({
    type: 'date',
    required: true,
    format: 'date'
  })
  fecha_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_termino: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_termino: string;

  @property({
    type: 'date',
    required: true,
  })
  llegada_estimada: string;
  @property({
    type: 'number',
    required: true,
  })
  longitud_actual: number;

  @property({
    type: 'number',
    required: true,
  })
  latitud_actual: number;

  @belongsTo(() => Chofer)
  ref_chofer: string;

  @belongsTo(() => Camion)
  ref_camion: string;

  @belongsTo(() => Ruta)
  ref_ruta: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Recorrido>) {
    super(data);
  }
}
