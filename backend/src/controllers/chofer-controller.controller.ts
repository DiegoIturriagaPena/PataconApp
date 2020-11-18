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
import { Chofer } from '../models';
import { ChoferRepository } from '../repositories';
import { IFecha } from './camion-controller.controller';


export class ChoferController {
  constructor(
    @repository(ChoferRepository)
    public choferRepository: ChoferRepository,
  ) { }

  @post('/choferes', {
    responses: {
      '200': {
        description: 'Chofer model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Chofer } } },
      },
    },
  })
  async create(@requestBody() chofer: Chofer): Promise<Chofer> {
    return await this.choferRepository.create(chofer);
  }

  @get('/choferes/count', {
    responses: {
      '200': {
        description: 'Chofer model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Chofer)) where?: Where,
  ): Promise<Count> {
    return await this.choferRepository.count(where);
  }

  @get('/choferes', {
    responses: {
      '200': {
        description: 'Array of Chofer model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Chofer } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Chofer)) filter?: Filter,
  ): Promise<Chofer[]> {
    return await this.choferRepository.find(filter);
  }

  @patch('/choferes', {
    responses: {
      '200': {
        description: 'Chofer PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() chofer: Chofer,
    @param.query.object('where', getWhereSchemaFor(Chofer)) where?: Where,
  ): Promise<Count> {
    return await this.choferRepository.updateAll(chofer, where);
  }

  @get('/choferes/{id}', {
    responses: {
      '200': {
        description: 'Chofer model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Chofer } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Chofer> {
    return await this.choferRepository.findById(id);
  }

  @patch('/choferes/{id}', {
    responses: {
      '204': {
        description: 'Chofer PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() chofer: Chofer,
  ): Promise<void> {
    await this.choferRepository.updateById(id, chofer);
  }

  @put('/choferes/{id}', {
    responses: {
      '204': {
        description: 'Chofer PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() chofer: Chofer,
  ): Promise<void> {
    await this.choferRepository.replaceById(id, chofer);
  }

  @del('/choferes/{id}', {
    responses: {
      '204': {
        description: 'Chofer DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.choferRepository.deleteById(id);
  }

  @post('/choferes/sinAsignar', {
    responses: {
      '200': {
        description: 'Array con los Choferes que no han sido asignados a ningun recorrido',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Chofer } },
          },
        },
      },
    },
  })
  public sinAsignar(@requestBody() fecha: IFecha): Promise<Chofer[]> {
    let self = this.choferRepository;
    let sqlStmt = 'SELECT * FROM Chofer WHERE rut NOT IN (SELECT ref_chofer FROM Recorrido WHERE (fecha_inicio BETWEEN \'' + fecha.f_ini + '\' AND \'' + fecha.f_fin + '\') OR (fecha_termino BETWEEN \'' + fecha.f_ini + '\' AND \'' + fecha.f_fin + '\'));';
    return new Promise<Chofer[]>(function (resolve, reject) {
      self.dataSource.connector!.query(sqlStmt, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }
}
