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
import { Camion } from '../models';
import { CamionRepository } from '../repositories';

export interface IFecha {
  f_ini: any,
  f_fin: any,
}

export class CamionControllerController {
  constructor(
    @repository(CamionRepository)
    public camionRepository: CamionRepository,
  ) { }

  @post('/camiones', {
    responses: {
      '200': {
        description: 'Camion model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Camion } } },
      },
    },
  })

  async create(@requestBody() camion: Camion): Promise<Camion> {
    return await this.camionRepository.create(camion);
  }

  @get('/camiones/count', {
    responses: {
      '200': {
        description: 'Camion model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Camion)) where?: Where,
  ): Promise<Count> {
    return await this.camionRepository.count(where);
  }

  @get('/camiones', {
    responses: {
      '200': {
        description: 'Array of Camion model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Camion } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Camion)) filter?: Filter,
  ): Promise<Camion[]> {
    return await this.camionRepository.find(filter);
  }

  @patch('/camiones', {
    responses: {
      '200': {
        description: 'Camion PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() camion: Camion,
    @param.query.object('where', getWhereSchemaFor(Camion)) where?: Where,
  ): Promise<Count> {
    return await this.camionRepository.updateAll(camion, where);
  }

  @get('/camiones/{id}', {
    responses: {
      '200': {
        description: 'Camion model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Camion } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Camion> {
    return await this.camionRepository.findById(id);
  }

  @patch('/camiones/{id}', {
    responses: {
      '204': {
        description: 'Camion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() camion: Camion,
  ): Promise<void> {
    await this.camionRepository.updateById(id, camion);
  }

  @put('/camiones/{id}', {
    responses: {
      '204': {
        description: 'Camion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() camion: Camion,
  ): Promise<void> {
    await this.camionRepository.replaceById(id, camion);
  }

  @del('/camiones/{id}', {
    responses: {
      '204': {
        description: 'Camion DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.camionRepository.deleteById(id);
  }


  @post('/camiones/sinAsignar', {
    responses: {
      '200': {
        description: 'Array con los Camiones sin asignar a ningun recorrido',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Camion } },
          },
        },
      },
    },
  })
  public sinAsignar(@requestBody() fecha: IFecha): Promise<Camion[]> {
    let self = this.camionRepository;
    // let sqlStmt = `SELECT * FROM Camion WHERE patente NOT IN (SELECT ref_camion FROM Recorrido)`;
    let sqlStmt = 'SELECT * FROM Camion WHERE patente NOT IN (SELECT ref_camion FROM Recorrido WHERE (fecha_inicio BETWEEN \'' + fecha.f_ini + '\' AND \'' + fecha.f_fin + '\') OR (fecha_termino BETWEEN \'' + fecha.f_ini + '\' AND \'' + fecha.f_fin + '\'));';
    // let sqlStmt = 'SELECT * FROM Camion WHERE patente NOT IN (SELECT ref_camion FROM Recorrido WHERE ( \'' + fecha.f_ini + '\' BETWEEN fecha_inicio  AND fecha_termino) OR ( \'' + fecha.f_fin + '\' BETWEEN fecha_inicio AND fecha_termino));';
    // console.log(sqlStmt);

    return new Promise<Camion[]>(function (resolve, reject) {
      self.dataSource.connector!.query(sqlStmt, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }

  @get('/camiones/segunCarga/{carga}', {
    responses: {
      '200': {
        description: 'Array con los Camiones que soportan la carga a transportar.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Camion } },
          },
        },
      },
    },
  })
  public segunCarga(@param.path.number('carga') carga: number): Promise<Camion[]> {
    let self = this.camionRepository;
    let sqlStmt = `SELECT * FROM Camion WHERE patente NOT IN (SELECT ref_camion FROM Recorrido) AND carga>=${carga}`;
    return new Promise<Camion[]>(function (resolve, reject) {
      self.dataSource.connector!.query(sqlStmt, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }

  @put('/camiones/actualizarRef/{id_gps}', {
    responses: {
      '200': {
        description: 'Actualiza la la referencia a los GPS',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Camion } },
          },
        },
      },
    },
  })
  public actualizarRef(@param.path.number('id_gps') id_gps: number): any {
    let self = this.camionRepository;
    let sqlStmt = `UPDATE Camion SET Camion.id_gps = 0 WHERE Camion.id_gps=${id_gps}`;
    return new Promise<Camion[]>(function (resolve, reject) {
      self.dataSource.connector!.query(sqlStmt, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }
}
