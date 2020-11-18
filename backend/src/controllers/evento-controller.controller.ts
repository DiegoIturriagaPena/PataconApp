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
import { Evento } from '../models';
import { EventoRepository } from '../repositories';

export interface EventInterfaceState {
  id_evento: number;
  tipo: string;
}

export class EventoController {
  constructor(
    @repository(EventoRepository)
    public eventoRepository: EventoRepository,
  ) { }

  @post('/eventos', {
    responses: {
      '200': {
        description: 'Evento model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Evento } } },
      },
    },
  })
  async create(@requestBody() evento: Evento): Promise<Evento> {
    return await this.eventoRepository.create(evento);
  }

  @get('/eventos/count', {
    responses: {
      '200': {
        description: 'Evento model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where,
  ): Promise<Count> {
    return await this.eventoRepository.count(where);
  }

  @get('/eventos', {
    responses: {
      '200': {
        description: 'Array of Evento model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Evento } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Evento)) filter?: Filter,
  ): Promise<Evento[]> {
    return await this.eventoRepository.find(filter);
  }

  @patch('/eventos', {
    responses: {
      '200': {
        description: 'Evento PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() evento: Evento,
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where,
  ): Promise<Count> {
    return await this.eventoRepository.updateAll(evento, where);
  }

  @get('/eventos/{id}', {
    responses: {
      '200': {
        description: 'Evento model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Evento } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Evento> {
    return await this.eventoRepository.findById(id);
  }

  @patch('/eventos/{id}', {
    responses: {
      '204': {
        description: 'Evento PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() evento: Evento,
  ): Promise<void> {
    await this.eventoRepository.updateById(id, evento);
  }

  @put('/eventos/{id}', {
    responses: {
      '204': {
        description: 'Evento PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evento: Evento,
  ): Promise<void> {
    await this.eventoRepository.replaceById(id, evento);
  }

  @del('/eventos/{id}', {
    responses: {
      '204': {
        description: 'Evento DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eventoRepository.deleteById(id);
  }

  @post('/eventos/state', {
    responses: {
      '200': {
        description: 'Estado de evento update',
      },
    },
  })
  async changeState(
    @requestBody() evento: EventInterfaceState,
  ): Promise<object> {
    const event = await this.eventoRepository;
    const sql =
      "UPDATE Evento SET Evento.tipo ='" +
      evento.tipo +
      "' WHERE Evento.id_evento = " +
      evento.id_evento +
      ';';
    console.log(sql);
    await new Promise<any[]>(function (resolve, reject) {
      event.dataSource.connector!.query(sql, function (
        err: any,
        results: any[],
      ) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
    return { data: '200' };

    // await this.usuarioRepository.deleteById(id);
  }

  @get('/eventos/segunFecha/{fecha}/{tipo}', {
    responses: {
      '200': {
        description: 'Evento model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Evento } } },
      },
    },
  })
  public segunFecha(
    @param.path.string('fecha') fecha: string,
    @param.path.string('tipo') tipo: string,
  ): Promise<Evento[]> {
    let self = this.eventoRepository;
    let sqlStmt = `SELECT * FROM Evento WHERE tipo = '${tipo}' AND cast(fecha as date) =  cast('${fecha}' as date);`;
    console.log(sqlStmt);
    return new Promise<Evento[]>(function (resolve, reject) {
      self.dataSource.connector!.query(sqlStmt, function (
        err: any,
        results: any[],
      ) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }
}
