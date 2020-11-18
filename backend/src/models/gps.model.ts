import { Model, model, property, hasOne, Entity } from '@loopback/repository';
import { Camion } from './camion.model';

@model({ settings: { "strict": false } })
export class Gps extends Entity {
  @property({
    type: 'number',
    dataType: 'double',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'number',
    required: true,
  })
  numero_chip: number;

  @hasOne(() => Camion)
  camion?: Camion;
  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Gps>) {
    super(data);
  }
}
