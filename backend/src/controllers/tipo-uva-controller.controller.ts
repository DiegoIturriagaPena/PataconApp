import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { TipoUva } from '../models';
import { TipoUvaRepository } from '../repositories';
import { throws } from 'assert';

export class TipoUvaController {
  constructor(
    @repository(TipoUvaRepository)
    public tipoUvaRepository: TipoUvaRepository,
  ) { }

  @post('/tipo-uvas', {
    responses: {
      '200': {
        description: 'TipoUva model instance',
        content: { 'application/json': { schema: { 'x-ts-type': TipoUva } } },
      },
    },
  })
  async create(@requestBody() tipoUva: TipoUva): Promise<object> {

    const currentUva: TipoUva[] = await this.tipoUvaRepository.find({
      where: {
        tipo_uva: (tipoUva.tipo_uva as string).toLocaleLowerCase()
      }
    });

    if (currentUva.length > 0) {
      throw new HttpErrors.Unauthorized('Exists');
    } else {
      tipoUva.tipo_uva = (tipoUva.tipo_uva as string).toLocaleLowerCase();
      await this.tipoUvaRepository.create(tipoUva);
      return { data: "200" };
    }
  }

  @get('/tipo-uvas/count', {
    responses: {
      '200': {
        description: 'TipoUva model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TipoUva)) where?: Where,
  ): Promise<Count> {
    return await this.tipoUvaRepository.count(where);
  }

  @get('/tipo-uvas', {
    responses: {
      '200': {
        description: 'Array of TipoUva model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': TipoUva } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TipoUva)) filter?: Filter,
  ): Promise<TipoUva[]> {
    return await this.tipoUvaRepository.find(filter);
  }

  @patch('/tipo-uvas', {
    responses: {
      '200': {
        description: 'TipoUva PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() tipoUva: TipoUva,
    @param.query.object('where', getWhereSchemaFor(TipoUva)) where?: Where,
  ): Promise<Count> {
    return await this.tipoUvaRepository.updateAll(tipoUva, where);
  }

  @get('/tipo-uvas/{id}', {
    responses: {
      '200': {
        description: 'TipoUva model instance',
        content: { 'application/json': { schema: { 'x-ts-type': TipoUva } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<TipoUva> {
    return await this.tipoUvaRepository.findById(id);
  }

  @patch('/tipo-uvas/{id}', {
    responses: {
      '204': {
        description: 'TipoUva PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() tipoUva: TipoUva,
  ): Promise<void> {
    await this.tipoUvaRepository.updateById(id, tipoUva);
  }

  @put('/tipo-uvas/{id}', {
    responses: {
      '204': {
        description: 'TipoUva PUT success',
      },
    },
  })
  async replaceById(
    @requestBody() tipoUva: TipoUva,
    @param.path.number('id') id: number,
  ): Promise<object> {
    console.log(tipoUva);
    let u: TipoUva[] = await this.tipoUvaRepository.find({
      where: {
        tipo_uva: (tipoUva.tipo_uva as string).toLocaleLowerCase(),
        id_tipo_uva: {
          neq: id
        }
      }
    });
    console.log(u);
    if (u.length > 0) {
      throw new HttpErrors.BadRequest('Exist');
    } else {
      tipoUva.tipo_uva = (tipoUva.tipo_uva as string).toLocaleLowerCase();
      await this.tipoUvaRepository.replaceById(id, tipoUva);
      return { data: '200' };
    }
  }

  @del('/tipo-uvas/{id}', {
    responses: {
      '204': {
        description: 'TipoUva DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoUvaRepository.deleteById(id);
  }





  /**
   * SELECT TipoUva.id_tipo_uva, TipoUva.tipo_uva, IF(T.tipouva_id IS NULL,false,true) as activo FROM TipoUva LEFT JOIN (SELECT * FROM VinaTipouva WHERE VinaTipouva.vinna_id = 1) as T ON TipoUva.id_tipo_uva = T.tipouva_id;
   */
}
