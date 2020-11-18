import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Vina } from './vina.model';
import { TipoUva } from './tipo-uva.model';

@model({
  settings: {
    strict: false,
    foreignKeys: {
      tipouva_id: {
        name: 'tipouva_id',
        foreignKey: 'tipouva_id',
        entityKey: 'id_tipo_uva',
        entity: 'TipoUva'
      },
      vinna_id: {
        name: 'vinna_id',
        foreignKey: 'vinna_id',
        entityKey: 'id_vina',
        entity: 'Vina'
      },
    }
  }
})
export class VinaTipouva extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true
  })
  tipouva_id?: number;

  @property({
    type: 'number',
    id: true,
    required: true
  })
  vinna_id?: number;


  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<VinaTipouva>) {
    super(data);
  }
}
