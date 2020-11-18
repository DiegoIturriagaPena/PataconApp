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
import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
import { Crypto } from '../providers/crypto-provider';
import { userInfo } from 'os';
import { Email } from '../providers/email';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @post('/usuarios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Usuario } } },
      },
    },
  })
  async create(@requestBody() usuario: Usuario): Promise<Usuario> {
    usuario.password = Crypto.encypt(usuario.password);

    //Crear un usuario.
    this.usuarioRepository.create(usuario);
    usuario.password = '******';
    usuario.api_token = '******';
    return usuario;
  }

  @get('/usuarios/count', {
    responses: {
      '200': {
        description: 'Usuario model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where,
  ): Promise<Count> {
    return await this.usuarioRepository.count(where);
  }

  @get('/usuarios', {
    responses: {
      '200': {
        description: 'Array of Usuario model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Usuario } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Usuario)) filter?: Filter,
  ): Promise<Usuario[]> {
    return await this.usuarioRepository.find(filter);
  }

  @patch('/usuarios', {
    responses: {
      '200': {
        description: 'Usuario PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() usuario: Usuario,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where,
  ): Promise<Count> {
    return await this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Usuario } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findById(id);
    //usuario.password = Crypto.descrypt(usuario.password);
    return usuario;
  }

  @patch('/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    usuario.password = Crypto.encypt(usuario.password);
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  @post('/usuarios/recoverypass', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Usuario } } },
      },
    },
  })
  async recoveyPassword(@requestBody() usuario: any): Promise<object> {
    var g_generated = '';
    let user = await this.usuarioRepository.findOne({
      where: {
        correo: usuario.email
      }
    });
    if (user) {
      g_generated = await Crypto.randomPass();
      user.password = Crypto.encypt(g_generated);
      await this.usuarioRepository.updateById(user.rut, user);
      return { data: '200' };
    } else {
      throw new HttpErrors.BadRequest('No realizado');
    }
  }
}
