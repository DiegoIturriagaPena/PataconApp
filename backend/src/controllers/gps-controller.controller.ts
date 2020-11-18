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
} from '@loopback/rest';
import { Gps } from '../models';
import { GpsRepository } from '../repositories';

export class GpsController {
  constructor(
    @repository(GpsRepository)
    public gpsRepository: GpsRepository,
  ) { }

  @post('/gps', {
    responses: {
      '200': {
        description: 'Gps model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Gps } } },
      },
    },
  })
  async create(@requestBody() gps: Gps): Promise<Gps> {
    return await this.gpsRepository.create(gps);
  }

  @get('/gps/count', {
    responses: {
      '200': {
        description: 'Gps model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Gps)) where?: Where,
  ): Promise<Count> {
    return await this.gpsRepository.count(where);
  }

  @get('/gps', {
    responses: {
      '200': {
        description: 'Array of Gps model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Gps } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Gps)) filter?: Filter,
  ): Promise<Gps[]> {
    return await this.gpsRepository.find(filter);
  }

  @patch('/gps', {
    responses: {
      '200': {
        description: 'Gps PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() gps: Gps,
    @param.query.object('where', getWhereSchemaFor(Gps)) where?: Where,
  ): Promise<Count> {
    return await this.gpsRepository.updateAll(gps, where);
  }

  @get('/gps/{id}', {
    responses: {
      '200': {
        description: 'Gps model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Gps } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Gps> {
    return await this.gpsRepository.findById(id);
  }

  @patch('/gps/{id}', {
    responses: {
      '204': {
        description: 'Gps PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() gps: Gps,
  ): Promise<void> {
    await this.gpsRepository.updateById(id, gps);
  }

  @put('/gps/{id}', {
    responses: {
      '204': {
        description: 'Gps PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gps: Gps,
  ): Promise<void> {
    await this.gpsRepository.replaceById(id, gps);
  }

  @del('/gps/{id}', {
    responses: {
      '204': {
        description: 'Gps DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gpsRepository.deleteById(id);
  }


}
