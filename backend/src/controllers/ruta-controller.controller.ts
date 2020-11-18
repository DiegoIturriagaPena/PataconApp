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
import { Ruta, Vina } from '../models';
import { RutaRepository } from '../repositories';

export class RutaController {
  constructor(
    @repository(RutaRepository)
    public rutaRepository: RutaRepository,
  ) { }

  @post('/rutas', {
    responses: {
      '200': {
        description: 'Ruta model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Ruta } } },
      },
    },
  })
  async create(@requestBody() ruta: Ruta): Promise<Ruta> {
    return await this.rutaRepository.create(ruta);
  }

  @get('/rutas/count', {
    responses: {
      '200': {
        description: 'Ruta model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Ruta)) where?: Where,
  ): Promise<Count> {
    return await this.rutaRepository.count(where);
  }

  @get('/rutas', {
    responses: {
      '200': {
        description: 'Array of Ruta model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Ruta } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ruta)) filter?: Filter,
  ): Promise<Ruta[]> {
    return await this.rutaRepository.find(filter);
  }

  @patch('/rutas', {
    responses: {
      '200': {
        description: 'Ruta PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() ruta: Ruta,
    @param.query.object('where', getWhereSchemaFor(Ruta)) where?: Where,
  ): Promise<Count> {
    return await this.rutaRepository.updateAll(ruta, where);
  }

  @get('/rutas/{id}', {
    responses: {
      '200': {
        description: 'Ruta model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Ruta } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Ruta> {
    return await this.rutaRepository.findById(id);
  }

  @patch('/rutas/{id}', {
    responses: {
      '204': {
        description: 'Ruta PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() ruta: Ruta,
  ): Promise<void> {
    await this.rutaRepository.updateById(id, ruta);
  }

  @put('/rutas/{id}', {
    responses: {
      '204': {
        description: 'Ruta PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ruta: Ruta,
  ): Promise<void> {
    await this.rutaRepository.replaceById(id, ruta);
  }

  @del('/rutas/{id}', {
    responses: {
      '204': {
        description: 'Ruta DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rutaRepository.deleteById(id);
  }
  @get('/rutas/rutasAsociadasConProductor', {
    responses: {
      '200': {
        description: 'Array con los productores que tienen asociados una ruta',
        content: {
          'application/json': {
            schema: { type: 'array' },
          },
        },
      },
    },
  })
  public rutasAsociadasConProductor(): Promise<any[]> {
    let self = this.rutaRepository;
    let sqlStmt = "SELECT Ruta.*, Productor.*,Vina.nombre_vina FROM Ruta,Vina, Productor WHERE Ruta.ref_vinna=Vina.id_vina AND Vina.ref_productor=Productor.id_productor AND Productor.disponible=true";
    return new Promise<any[]>(function (resolve, reject) {
      self.dataSource.connector!.query(sqlStmt, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }
  @get('/rutas/all', {
    responses: {
      '200': {
        description: 'Todas las rutas',
      },
    },
  })
  async getAllRutas(): Promise<object> {
    const rutas = await this.rutaRepository;
    const sql = 'SELECT Ruta.id_ruta,Ruta.ref_vinna, Productor.nombre, Ruta.duracion_aprox FROM Ruta , Vina, Productor WHERE Ruta.ref_vinna = Vina.id_vina AND Vina.ref_productor = Productor.id_productor;';
    return new Promise<any[]>(function (resolve, reject) {
      rutas.dataSource.connector!.query(sql, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });

  }
}
