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
import { Recorrido } from '../models';
import { RecorridoRepository } from '../repositories';

export class RecorridoController {
  constructor(
    @repository(RecorridoRepository)
    public recorridoRepository: RecorridoRepository,
  ) { }

  @post('/recorridos', {
    responses: {
      '200': {
        description: 'Recorrido model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Recorrido } } },
      },
    },
  })
  async create(@requestBody() recorrido: Recorrido): Promise<Recorrido> {
    return await this.recorridoRepository.create(recorrido);
  }

  @get('/recorridos/count', {
    responses: {
      '200': {
        description: 'Recorrido model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Recorrido)) where?: Where,
  ): Promise<Count> {
    return await this.recorridoRepository.count(where);
  }

  @get('/recorridos', {
    responses: {
      '200': {
        description: 'Array of Recorrido model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Recorrido } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Recorrido)) filter?: Filter,
  ): Promise<Recorrido[]> {
    return await this.recorridoRepository.find(filter);
  }

  @patch('/recorridos', {
    responses: {
      '200': {
        description: 'Recorrido PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() recorrido: Recorrido,
    @param.query.object('where', getWhereSchemaFor(Recorrido)) where?: Where,
  ): Promise<Count> {
    return await this.recorridoRepository.updateAll(recorrido, where);
  }

  @get('/recorridos/{id}', {
    responses: {
      '200': {
        description: 'Recorrido model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Recorrido } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Recorrido> {
    return await this.recorridoRepository.findById(id);
  }

  @patch('/recorridos/{id}', {
    responses: {
      '204': {
        description: 'Recorrido PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() recorrido: Recorrido,
  ): Promise<void> {
    await this.recorridoRepository.updateById(id, recorrido);
  }

  @put('/recorridos/{id}', {
    responses: {
      '204': {
        description: 'Recorrido PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recorrido: Recorrido,
  ): Promise<void> {
    await this.recorridoRepository.replaceById(id, recorrido);
  }

  @del('/recorridos/{id}', {
    responses: {
      '204': {
        description: 'Recorrido DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recorridoRepository.deleteById(id);
  }


  //SELECT * FROM Productor INNER JOIN (SELECT * From Recorrido INNER JOIN (SELECT Ruta.id_ruta, Vina.id_vina,Vina.ref_productor, Vina.nombre_vina From Ruta INNER JOIN Vina on Ruta.ref_vinna = Vina.id_vina) as T on Recorrido.ref_ruta = T.id_ruta) as R ON Productor.id_productor = R.ref_productor;

  @get('/recorridos/all', {
    responses: {
      '204': {
        description: 'Recorrido DELETE success',
      },
    },
  })
  async getAllRecorridos(): Promise<object> {
    const rutas = await this.recorridoRepository;
    const sql = 'SELECT * FROM Productor INNER JOIN (SELECT * From Recorrido INNER JOIN (SELECT Ruta.id_ruta, Vina.id_vina,Vina.ref_productor, Vina.nombre_vina From Ruta INNER JOIN Vina on Ruta.ref_vinna = Vina.id_vina) as T on Recorrido.ref_ruta = T.id_ruta) as R ON Productor.id_productor = R.ref_productor;';
    return new Promise<any[]>(function (resolve, reject) {
      rutas.dataSource.connector!.query(sql, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }

}
