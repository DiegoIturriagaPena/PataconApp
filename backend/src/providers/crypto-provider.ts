import * as crypto from 'crypto-js';

class CryptoProvider {
  private KEY: string = 'la cumbia me divierte y mesita';
  private iv: string = crypto.enc.Utf8.parse('UwU');
  private options: any = {
    keySize: 64,
    iv: this.iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  }

  constructor() {
  }

  /**
   *
   * @param text Parametro a encriptar.
   * @returns Param encrypt using AES.
   */
  encypt(text: any) {
    const cryptkey = crypto.enc.Utf8.parse(this.KEY);
    const encrypted = crypto.AES.encrypt(text, cryptkey, this.options);
    return encrypted.toString();
  }

  /**
   *
   * @param text parametro encriptado.
   * @returns Parametro original.
   */
  descrypt(text: any) {
    const cryptoPrivateKey = crypto.enc.Utf8.parse(this.KEY);
    const encryptedKey = crypto.enc.Base64.parse(text);
    const decrypted = crypto.AES.decrypt(encryptedKey, cryptoPrivateKey, this.options);
    return decrypted.toString(crypto.enc.Utf8);
  }

  /**
   *
   * @param text_encrypted Parametro encriptado.
   * @param text Parametro a comparar.
   * @example comapre('Adikcna13_124fac&/(aq23==', 123)
   * @description Puede recibir cualquier tipo de datos en ambos parametros.
   */
  compare(text_encrypted: any, text: any): boolean {
    const toCompare = this.encypt(text);
    if (toCompare === text_encrypted) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @author Patricio Quezada L.
   * @summary Crea contraseñas aleatorias.
   */
  async randomPass(): Promise<string> {
    let result = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = chars.length;
    let num_random = Math.floor(Math.random() * (10 - 5)) + 5;
    for (var i = 0; i < num_random; i++) {
      result += chars.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export const Crypto = new CryptoProvider();
