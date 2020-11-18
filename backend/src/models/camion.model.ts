import { belongsTo, model, property, Entity } from '@loopback/repository';
import { Gps } from './gps.model'
@model({
  settings: {
    "strict": false,
    "foreignKeys": {
      "id_gps": {
        "name": "id_gps",
        "foreignKey": "id_gps",
        "entityKey": "id",
        "entity": "Gps"
      }
    }
  }
})
export class Camion extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  patente: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad_total: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  carga?: number;

  @property({
    type: 'string',
  })
  dueno?: string;

  @property({
    type: 'string',
  })
  tipo?: string;

  @property({
    type: 'string',
  })
  fono_dueno?: number;

  @property({
    type: 'boolean',
    default: true
  })
  disponible?: boolean;

  //@belongsTo(() => Gps)
  @property({
    type: 'number',
    dataType: 'double'
  })
  id_gps: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Camion>) {
    super(data);
  }
}
