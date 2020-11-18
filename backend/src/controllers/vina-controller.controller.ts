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
import { Vina, VinaTipouva } from '../models';
import { VinaRepository, VinaTipouvaRepository } from '../repositories';
import { IVina } from '../interfaces/i-vina';
import { IUva } from '../interfaces/i-uva';

export class VinaController {
  constructor(
    @repository(VinaRepository)
    public vinaRepository: VinaRepository,
    @repository(VinaTipouvaRepository)
    public vinaTipoRepository: VinaTipouvaRepository
  ) { }

  @post('/vinas', {
    responses: {
      '200': {
        description: 'Vina model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Vina } } },
      },
    },
  })
  async create(@requestBody() vina: Vina): Promise<Vina> {
    return await this.vinaRepository.create(vina);
  }

  @get('/vinas/count', {
    responses: {
      '200': {
        description: 'Vina model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Vina)) where?: Where,
  ): Promise<Count> {
    return await this.vinaRepository.count(where);
  }

  @get('/vinas', {
    responses: {
      '200': {
        description: 'Array of Vina model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Vina } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Vina)) filter?: Filter,
  ): Promise<Vina[]> {
    return await this.vinaRepository.find(filter);
  }

  @patch('/vinas', {
    responses: {
      '200': {
        description: 'Vina PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() vina: Vina,
    @param.query.object('where', getWhereSchemaFor(Vina)) where?: Where,
  ): Promise<Count> {
    return await this.vinaRepository.updateAll(vina, where);
  }

  @get('/vinas/{id}', {
    responses: {
      '200': {
        description: 'Vina model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Vina } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Vina> {
    return await this.vinaRepository.findById(id);
  }

  @patch('/vinas/{id}', {
    responses: {
      '204': {
        description: 'Vina PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() vina: Vina,
  ): Promise<void> {
    await this.vinaRepository.updateById(id, vina);
  }

  @put('/vinas/{id}', {
    responses: {
      '204': {
        description: 'Vina PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vina: Vina,
  ): Promise<void> {
    await this.vinaRepository.replaceById(id, vina);
  }

  @del('/vinas/{id}', {
    responses: {
      '204': {
        description: 'Vina DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vinaRepository.deleteById(id);
  }

  /**
   * @author Patricio Quezada
   * @param vina Viña a guardar.
   * @summary Metodo modificado para guardar
   */
  @post('/vinas/add', {
    responses: {
      '200': {
        description: 'Vina model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Vina } } },
      },
    },
  })
  async save_new_vina(@requestBody() vina: IVina): Promise<object> {
    // console.log(vina);
    let v = new Vina();
    v.nombre_vina = vina.nombre_vina as string;
    v.latitud_ubicacion = vina.latitud_ubicacion as number;
    v.longitud_ubicacion = vina.longitud_ubicacion as number;
    v.ref_productor = vina.ref_productor as number;
    // console.log('Nuevo cliente', v);
    const current_vina: Vina = await this.vinaRepository.create(v);
    const array = vina.uvas || [];
    await Promise.all(array.map(async (c, index, array) => {
      // console.log(c);
      if (c.activo) {
        // console.log('Creando');
        const vinaTipo = new VinaTipouva();
        vinaTipo.tipouva_id = c.id_tipo_uva;
        vinaTipo.vinna_id = current_vina.id_vina;
        await this.vinaTipoRepository.create(vinaTipo);
      }
    })).then().catch(y => console.log(y));
    return { data: '' };
  }

  @get('/vinas/getall/{id}', {
    responses: {
      '200': {
        description: 'Vina model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Vina } } },
      },
    },
  })
  async getVinasById(@param.path.number('id') id: number): Promise<object> {
    const vinas = await this.vinaRepository.find({
      where: {
        ref_productor: id
      }
    });
    if (vinas.length > 0) {
      return vinas;
    } else {
      throw new HttpErrors.BadRequest('No realizado');
    }
  }


  /**
   * @summary Obtiene los datos de la viña segun el id
   * @param id de la viña
   */
  @get('/vinas/get/{id}', {
    responses: {
      '200': {
        description: 'Vina model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Vina } } },
      },
    },
  })
  async getVinaById(@param.path.number('id') id: number): Promise<object> {
    let vi: IVina;
    const vinas = await this.vinaRepository.findOne({
      where: {
        id_vina: id
      }
    });
    console.log(vinas);
    if (vinas) {
      const uvas = await this.vinaTipoRepository;
      const sql = 'SELECT TipoUva.id_tipo_uva, TipoUva.tipo_uva, IF(T.tipouva_id IS NULL,false,true) as activo FROM TipoUva LEFT JOIN (SELECT * FROM VinaTipouva WHERE VinaTipouva.vinna_id = ' + id + ') as T ON TipoUva.id_tipo_uva = T.tipouva_id'
      const v = await new Promise<any[]>(function (resolve, reject) {
        uvas.dataSource.connector!.query(sql, function (err: any, results: any[]) {
          if (err !== null) { return reject(err) };

          resolve(results);
        });
      });

      vi = {
        id_vina: vinas.id_vina,
        nombre_vina: vinas.nombre_vina,
        latitud_ubicacion: vinas.latitud_ubicacion,
        longitud_ubicacion: vinas.longitud_ubicacion,
        uvas: v || []
      }
      return vi;
    } else {
      throw new HttpErrors.BadRequest('No realizado');
    }
  }


  /**
   * @summary Obtiene los datos de la viña segun el id
   * @param id de la viña
   */
  @post('/vinas/set', {
    responses: {
      '200': {
        description: 'Vina model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Vina } } },
      },
    },
  })
  async setVinas(@requestBody() vina: IVina): Promise<object> {
    const id = vina.id_vina || -1;
    let vinas = await this.vinaRepository.findOne({
      where: {
        id_vina: id
      }
    });

    console.log(vina);
    console.log(vinas);

    if (vinas) {
      vinas.nombre_vina = vina.nombre_vina || '';
      vinas.latitud_ubicacion = vina.latitud_ubicacion || -1;
      vinas.longitud_ubicacion = vina.longitud_ubicacion || -1;

      await this.vinaRepository.updateById(vina.id_vina, vinas);

      await this.vinaTipoRepository.deleteAll({
        where: {
          vinna_id: id
        }
      });

      let array = vina.uvas || [];
      await Promise.all(array.map(async (c, index, array) => {
        // console.log(c);
        if (c.activo) {
          // console.log('Creando');
          const vinaTipo = new VinaTipouva();
          vinaTipo.tipouva_id = c.id_tipo_uva;
          vinaTipo.vinna_id = id;
          await this.vinaTipoRepository.create(vinaTipo);
        }
      })).then().catch(y => console.log(y));
      return { data: '' };

    } else {
      throw new HttpErrors.BadRequest('No realizado');
    }
  }




  // * SELECT TipoUva.id_tipo_uva, TipoUva.tipo_uva, IF(T.tipouva_id IS NULL,false,true) as activo FROM TipoUva LEFT JOIN (SELECT * FROM VinaTipouva WHERE VinaTipouva.vinna_id = 1) as T ON TipoUva.id_tipo_uva = T.tipouva_id;

}
