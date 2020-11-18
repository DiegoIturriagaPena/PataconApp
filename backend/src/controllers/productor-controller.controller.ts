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
import { Productor } from '../models';
import { ProductorRepository } from '../repositories';

export class ProductorController {
  constructor(
    @repository(ProductorRepository)
    public productorRepository: ProductorRepository,
  ) { }


  /**
   * @author Patricio Quezada L.
   * @param productor productor ingresado
   * @summary Crea un nuevo productor
   */
  @post('/productores', {
    responses: {
      '200': {
        description: 'Productor model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Productor } } },
      },
    },
  })
  async create(@requestBody() productor: Productor): Promise<object> {

    // return await this.productorRepository.create(productor);

    const current_productor = await this.productorRepository.findOne({
      where: {
        rut: productor.rut
      }
    });

    // Si existe el productor buscado
    if (current_productor) {
      throw new HttpErrors.BadRequest('Imposible procesar la peticion');
    } else {
      await this.productorRepository.create(productor);
      return { data: '200' };
    }

  }

  @get('/productores/count', {
    responses: {
      '200': {
        description: 'Productor model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Productor)) where?: Where,
  ): Promise<Count> {
    return await this.productorRepository.count(where);
  }

  @get('/productores', {
    responses: {
      '200': {
        description: 'Array of Productor model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Productor } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Productor))
    filter?: Filter,
  ): Promise<Productor[]> {
    return await this.productorRepository.find(filter);
  }

  @patch('/productores', {
    responses: {
      '200': {
        description: 'Productor PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() productor: Productor,
    @param.query.object('where', getWhereSchemaFor(Productor)) where?: Where,
  ): Promise<Count> {
    return await this.productorRepository.updateAll(productor, where);
  }

  @get('/productores/{id}', {
    responses: {
      '200': {
        description: 'Productor model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Productor } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Productor> {
    return await this.productorRepository.findById(id);
  }

  @patch('/productores/{id}', {
    responses: {
      '204': {
        description: 'Productor PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() productor: Productor,
  ): Promise<void> {
    await this.productorRepository.updateById(id, productor);
  }

  @put('/productores/{id}', {
    responses: {
      '204': {
        description: 'Productor PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productor: Productor,
  ): Promise<void> {
    await this.productorRepository.replaceById(id, productor);
  }

  @del('/productores/{id}', {
    responses: {
      '204': {
        description: 'Productor DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productorRepository.deleteById(id);
  }


  /**
     * @author Patricio Quezada L.
     * @param productor productor ingresado
     * @summary Habilita o deshabilita un productor
     */
  @post('/productores/state', {
    responses: {
      '200': {
        description: 'Productor model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Productor } } },
      },
    },
  })
  async changeState(@requestBody() productors: any): Promise<object> {


    let current_productor = await this.productorRepository.findOne({
      where: {
        rut: productors.rut
      }
    });

    if (current_productor) {
      (current_productor as Productor).disponible = (productors as Productor).disponible;
      await this.productorRepository.updateById(current_productor.id_productor, current_productor);
      return { data: '200' };
    } else {
      throw new HttpErrors.BadRequest('Imposible procesar la peticion');
    }

  }



  /**
   * @author Patricio Quezada L.
   * @param productor productor ingresado
   * @summary Modifica el productor ingresado
   */
  @post('/productores/set', {
    responses: {
      '200': {
        description: 'Productor model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Productor } } },
      },
    },
  })
  async setProductor(@requestBody() productors: Productor): Promise<object> {


    let current_productor = await this.productorRepository.find({
      where: {
        rut: productors.rut,
        id_productor: {
          neq: productors.id_productor
        }
      }
    });

    if (current_productor.length < 1) {
      await this.productorRepository.updateById(productors.id_productor, productors);
      return { data: '200' };
    } else {
      throw new HttpErrors.BadRequest('Imposible procesar la peticion');
    }

  }

  @get('/productores/disponibles', {
    responses: {
      '200': {
        description: 'Productores model instance',
      },
    },
  })
  async getProductoresDisponibles(): Promise<object> {
    const rutas = await this.productorRepository;
    const sql = 'SELECT * FROM Productor WHERE Productor.disponible=true';
    return new Promise<any[]>(function (resolve, reject) {
      rutas.dataSource.connector!.query(sql, function (err: any, results: any[]) {
        if (err !== null) return reject(err);
        resolve(results);
      });
    });
  }

}
