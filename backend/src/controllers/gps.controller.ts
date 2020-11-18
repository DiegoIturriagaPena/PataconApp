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
import { verificarPos, verificarDistanciaRuta } from '../providers/geolocalizacion'

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

  @get('/gps/sinAsignar', {
    responses: {
      '200': {
        description: 'Array con los GPS sin asignar a ningun camion',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Gps } },
          },
        },
      },
    },
  })
  public sinAsignar(): Promise<Gps[]> {
    let self = this.gpsRepository;
    // agrego el id = 0 para que los camiones sin gps apunten a ese id
    let sqlStmt = "SELECT * FROM Gps WHERE id NOT IN (SELECT id_gps FROM Camion) OR id = '0'";
    return new Promise<Gps[]>(function (resolve, reject) {
      self.dataSource.connector!.query(sqlStmt, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }


  @get('/gps/allGPS', {
    responses: {
      '200': {
        description: 'Array con los GPS asociados a camiones + los gps que no estan asociados',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Gps } },
          },
        },
      },
    },
  })
  public gpsAsociadosCamiones(): Promise<any[]> {
    let self = this.gpsRepository;
    let sqlStmt = "SELECT T1.* FROM (SELECT Gps.*, Camion.patente FROM Gps,Camion WHERE Camion.id_gps=Gps.id AND Gps.id!=0) AS T1 UNION SELECT T2.*,NULL FROM (SELECT Gps.* FROM Gps WHERE id NOT IN (SELECT id_gps FROM Camion)) AS T2";
    return new Promise<Gps[]>(function (resolve, reject) {
      self.dataSource.connector!.query(sqlStmt, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }

  @get('/gps/revisarEstado/{data}', {
    responses: {
      '200': {
        description: 'Revisa el estado de un punto o gps',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Gps } },
          },
        },
      },
    },
  })
  async revisarEstado(@param.path.string('data') data: string): Promise<any> {
    let self = this.gpsRepository;
    verificarPos(data, async (nuevo_estado: any) => {
      console.log('estado anterior: ', JSON.parse(data).estado);
      console.log('nuevoestado: ', nuevo_estado);
      let sqlStmt = `UPDATE Evento SET tipo='${nuevo_estado}' WHERE id_evento=${JSON.parse(data).evento}`;
      if (nuevo_estado != "") {
        console.log('entrando a sqlstm');
        await new Promise<any>(function (resolve, reject) {
          self.dataSource.connector!.query(sqlStmt, function (err: any, results: any[]) {
            if (err !== null) return reject(err);
            resolve(results);
          });
        });
      }
      return new Promise<any>(function (resolve, reject) {
        resolve({ mensaje: 'Sin cambios' });
      });
    });
    return await {};
    //nuevo_estado = verificarDistanciaRuta(data);

  }
}
