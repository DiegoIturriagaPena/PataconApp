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
import { UsuarioRepository, RolRepository } from '../repositories';
import { IUsuario } from '../interfaces/i-usuario';
import { Crypto } from '../providers/crypto-provider';
import { Email } from '../providers/email';

export class SupervisorController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @repository(RolRepository)
    public rolRepository: RolRepository
  ) { }

  @post('/supervisores', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Usuario } } },
      },
    },
  })
  async create(@requestBody() usuario: IUsuario): Promise<Object> {
    // Crea usuario
    let new_user = new Usuario();

    const currentUser = await this.usuarioRepository.find({
      where: {
        or: [{
          correo: usuario.correo,
        }, {
          rut: usuario.rut
        }]
      },
    });
    // console.log(currentUser);
    if (currentUser.length > 0) {
      throw new HttpErrors.BadRequest('No realizado');
    } else {
      new_user.rut = usuario.rut as string;
      new_user.correo = usuario.correo as string;
      new_user.apellido_materno = usuario.apellido_materno as string;
      new_user.apellido_paterno = usuario.apellido_paterno as string;
      new_user.nombres = usuario.nombres as string;
      new_user.rol = 2;
      new_user.estado = 1;
      let g_generated = '';
      if (usuario.password_generated) {
        g_generated = await Crypto.randomPass();
        new_user.password = Crypto.encypt(g_generated);
      } else {
        new_user.password = Crypto.encypt(usuario.password);
      }
      let body = '<p>Hola!</p>' +
        '<br><p>Bienvenido a patacon</p><br>'
        + '<p>Su correo es:<strong>' + new_user.correo + '</strong></p><br><p>Su nueva contraseña: <strong>' + new_user.password + '</strong></p>';
      Email.sendMail(usuario.correo as string, 'prueba_patacon@gmail.com', 'Ingreso contraseña', body);
      const created = await this.usuarioRepository.create(new_user);

      return {
        data: '200'
      };
    }
  }

  @get('/supervisores/count', {
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

  // @param.query.object('filter', getFilterSchemaFor(Usuario)) filter?: Filter,
  @get('/supervisores', {
    responses: {
      '200': {
        description: 'Retorna los supervisores del sistema.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Usuario } },
          },
        },
      },
    },
  })
  async find(): Promise<Usuario[]> {
    const supervisores = await this.usuarioRepository.find({
      fields: {
        rut: true,
        correo: true,
        nombres: true,
        apellido_paterno: true,
        apellido_materno: true,
        telefono: true,
        estado: true,
      },
      where: {
        rol: 2
      }
    }
    );
    return supervisores;
  }

  @patch('/supervisores', {
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

  @get('/supervisores/{id}', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Usuario } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Usuario> {
    return await this.usuarioRepository.findById(id);
  }

  @patch('/supervisores/{id}', {
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

  @put('/supervisores/{id}', {
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
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/supervisores/{id}', {
    responses: {
      '204': {
        description: 'Usuario DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  @post('/supervisores/state', {
    responses: {
      '200': {
        description: 'Usuario update',
      },
    },
  })
  async changeState(@requestBody() usuario: IUsuario): Promise<object> {

    const currentUser = await this.usuarioRepository.findOne({
      where: {
        correo: usuario.correo
      }
    });
    if (currentUser) {
      // console.log(usuario.estado);
      // const update = await this.usuarioRepository.updateAll(currentUser, { estado: usuario.estado });

      const user = await this.usuarioRepository;
      const sql = 'UPDATE Usuario SET Usuario.estado =' + usuario.estado + ' WHERE Usuario.rut =\'' + usuario.rut + '\';';
      await new Promise<any[]>(function (resolve, reject) {
        user.dataSource.connector!.query(sql, function (err: any, results: any[]) {
          if (err !== null) return reject(err);
          resolve(results);
        });
      });
      return { data: '200' };
    } else {
      throw new HttpErrors.BadRequest('No realizado');
    }
    // await this.usuarioRepository.deleteById(id);
  }



  @post('/supervisores/update', {
    responses: {
      '200': {
        description: 'Usuario update',
      },
    },
  })
  async Update(@requestBody() usuario: IUsuario): Promise<object> {
    let pass = '';
    var g_generated = '';
    const currentUser = await this.usuarioRepository.findOne({
      where: {
        correo: usuario.correo
      }
    });
    if (currentUser) {

      if (usuario.password_set) {
        if (!usuario.password_generated) {
          g_generated = usuario.password || '';
          pass = 'password=\'' + Crypto.encypt(usuario.password) + '\',';
        } if (usuario.password_generated) {
          g_generated = await Crypto.randomPass();
          // console.log('password: ' + g_generated);
          pass = 'password=\'' + Crypto.encypt(g_generated) + '\',';
        }
      }
      else if (usuario.password_generated) {
        g_generated = await Crypto.randomPass();
        // console.log('password: ' + g_generated);
        pass = 'password=\'' + Crypto.encypt(g_generated) + '\',';
      }
      // const update = await this.usuarioRepository.updateAll(currentUser, { estado: usuario.estado });

      const user = await this.usuarioRepository;
      const sql = 'UPDATE Usuario SET ' +
        'nombres=\'' + usuario.nombres + '\', apellido_paterno=\'' + usuario.apellido_paterno + '\',apellido_materno=\'' + usuario.apellido_materno + '\',' + pass + 'correo=\'' + usuario.correo + '\'' +
        ' WHERE Usuario.rut =\'' + usuario.rut + '\';';
      await new Promise<any[]>(function (resolve, reject) {
        user.dataSource.connector!.query(sql, function (err: any, results: any[]) {
          if (err !== null) { return reject(err) };

          if (usuario.password_set) {
            let body = '<p>Estimad@,</p>' +
              '<br><p>Su contraseña ha sido restablecida</p><br>'
              + '<p>Su nueva contraseña: <strong>' + g_generated + '</strong></p>';
            Email.sendMail(usuario.correo as string, 'prueba_patacon@gmail.com', 'Restablecer contraseña', body);
          }
          resolve(results);
        });
      });
      return { data: '200' };
    } else {
      throw new HttpErrors.BadRequest('No realizado');
    }
    // await this.usuarioRepository.deleteById(id);
  }

}
