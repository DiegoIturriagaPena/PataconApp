import { Provider, inject, ValueOrPromise } from '@loopback/context';
//import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import { BasicStrategy } from 'passport-http';
import { repository } from '@loopback/repository';
import { UsuarioRepository } from '../repositories';
import { Crypto } from './crypto-provider';
import { RestBindings } from '@loopback/rest';
import { Response } from 'express-serve-static-core';


export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA) private metadata: AuthenticationMetadata,
    @repository(UsuarioRepository) public usuarioRepository: UsuarioRepository,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) {
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify.bind(this));
    }
    if (name === 'BearerStrategy') {
      return new BearerStrategy(this.verify2.bind(this));
    }
    else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  //TODO: crear verificar authentificacion
  async verify2(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {

  }

  async verify(
    username: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {

    const currentUser = await this.usuarioRepository.findOne(
      {
        where:
        {
          correo: username
        }
      }
    );

    if (currentUser) {
      if (Crypto.compare(currentUser.password, password)) {
        cb(null, currentUser);
      }
      else {
        cb(null, false);
      }
    } else {
      cb(null, false);
    }


    // find user by name & password
    // call cb(null, false) when user not found
    // call cb(null, user) when user is authenticated
  }
}
