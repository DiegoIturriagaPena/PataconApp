import { Entity, model, property, belongsTo } from '@loopback/repository';

import * as jwt from 'jsonwebtoken';
import { Rol } from './rol.model';

// let { jwt } = require('jsonwebtoken');

// const singAsync = promisify(jwt);

@model({ settings: { "strict": false } })
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  rut: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
  })
  apellido_paterno?: string;

  @property({
    type: 'string',
  })
  apellido_materno?: string;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
    required: true,
  })
  password?: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'string',
  })
  api_token?: string;

  /**
   * 1 activo
   * 0 inactivo
   */
  @property({
    type: 'number',
    default: 1,
  })
  estado?: number;
  // Define well-known properties here

  /**
   * Relacion con el Rol ONE:ONE
   */
  @belongsTo(() => Rol)
  rol: number;

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }

  /**
   * @description retorna un token generado por JWT.
   * @returns Token de cada usuario.
   */
  getToken() {
    // TODO: Añadir tipos de usuarios.

    const userDataForToken = {
      id: this.id,
      correo: this.correo,
      rol: this.rol,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3), // expira en 3 dias, cambiar el 3
    };

    //console.log(userDataForToken);
    //var jwt = require('jsonwebtoken');
    const token = jwt.sign(userDataForToken, 'TheVerySecurePrivateKey');

    return token;
  }

  /**
   * @returns TRUE: si el token es valido
   */
  isValidCurrentToken() {
    const token: any = jwt.decode(this.api_token || '');
    const tokenExpirationDate = token.exp;
    if (tokenExpirationDate >= Math.floor(Date.now() / 1000)) {
      return true;
    }
    else {
      return false;
    }
    console.log('Expiration', tokenExpirationDate);
  }
}
