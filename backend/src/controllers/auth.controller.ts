import { inject } from '@loopback/context';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';
import {
  get,
  RestBindings,
  Request,
  post,
  requestBody,
  Response,
  HttpErrors
} from '@loopback/rest';
import { DataSource } from 'loopback-datasource-juggler';
import { repository } from '@loopback/repository';
import { UsuarioRepository } from '../repositories';
import { ICredentials } from '../interfaces/credentials';
import { Crypto } from '../providers/crypto-provider';

export class AuthController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER, { optional: true })
    private user: UserProfile,
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('datasources.db') public dataSource: DataSource,
    @repository(UsuarioRepository) public usuarioRepository: UsuarioRepository,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) { }

  @authenticate('BasicStrategy')
  @get('/whoami')
  whoAmI(): string {
    return this.user.id;
  }

  @post('/login', {
    description: 'Permite logear al usuario.',
    responses: {
      '200': {
        description: 'Return credentials',
      },
      '401': {
        description: 'Unauthorized user',
      },
    },
  })
  async login(@requestBody() crs: ICredentials): Promise<object> {
    const currentUser = await this.usuarioRepository.findOne({
      where: {
        correo: crs.email,
      },
    });

    if (currentUser) {
      if (Crypto.compare(currentUser.password, crs.password)) {
        //TODO: RETURN OTHER
        const new_api_token = currentUser.getToken();
        currentUser.api_token = new_api_token;
        await this.usuarioRepository.update(currentUser);
        const response: ICredentials = {
          api_token: new_api_token,
          name: currentUser.nombres,
        };

        return response;
      }
    }

    throw new HttpErrors.Unauthorized('No autorizado');
  }

  @post('/login/verify', {
    description: 'Verifica la sesion del usuario',
    responses: {
      '200': {
        description: 'Return credentials',
      },
      '401': {
        description: 'Unauthorized user',
      },
    },
  })
  async verifySesion(@requestBody() crs: ICredentials): Promise<object> {
    const currentUser = await this.usuarioRepository.findOne({
      where: {
        api_token: crs.api_token
      },
    });

    if (currentUser) {
      if (currentUser.isValidCurrentToken()) {
        const i: ICredentials = {
          api_token: currentUser.api_token,
          name: currentUser.nombres,
        }
        return i;
      }
    }
    throw new HttpErrors.Unauthorized('No autorizado');
  }

}

export const authExample: ICredentials = {
  email: 'Ejemplo@heGame.com',
  password: 'unodostres',
};
