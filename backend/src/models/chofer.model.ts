import { belongsTo, Model, model, property, Entity } from '@loopback/repository';
@model({ settings: { "strict": false } })
export class Chofer extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  rut: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido_paterno: string;

  @property({
    type: 'string',
  })
  apellido_materno?: string;

  @property({
    type: 'number',
    required: true,
  })
  telefono: number;

  @property({
    type: 'string',
  })
  disponibilidad?: string;

  @property(({
    type: 'boolean'
  }))
  estado?: boolean;

  //@belongsTo(() => Camion)
  //ref_camion: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Chofer>) {
    super(data);
  }
}
