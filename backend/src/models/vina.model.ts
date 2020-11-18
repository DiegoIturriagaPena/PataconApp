import { belongsTo, model, property, Entity, hasOne, hasMany } from '@loopback/repository';
import { Productor } from './productor.model';
import { Ruta } from './ruta.model';
import { TipoUva } from './tipo-uva.model';
@model({ settings: { strict: false } })
export class Vina extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_vina?: number;

  @property({
    type: 'string',
    required: true
  })
  nombre_vina: string;

  @property({
    type: 'number',
    dataType: 'float',
    precision: 24,
    scale: 18,
    required: true,
  })
  longitud_ubicacion: number;

  @property({
    type: 'number',
    dataType: 'float',
    precision: 24,
    scale: 18,
    required: true,
  })
  latitud_ubicacion: number;

  // Define well-known properties here
  @hasMany(() => TipoUva, { keyTo: 'ref_vinna' })
  tipouvas?: TipoUva[]

  @hasOne(() => Ruta, { keyTo: 'ref_vinna' })
  ruta?: Ruta;
  // Indexer property to allow additional data
  [prop: string]: any;

  @belongsTo(() => Productor)
  ref_productor: number;

  constructor(data?: Partial<Vina>) {
    super(data);
  }
}
