import { belongsTo, model, property, Entity } from '@loopback/repository';
import { Vina } from './vina.model';
@model({ settings: { strict: false } })
export class TipoUva extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_tipo_uva?: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo_uva: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<TipoUva>) {
    super(data);
  }
}
