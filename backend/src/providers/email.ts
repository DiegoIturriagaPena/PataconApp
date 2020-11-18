import * as nodemailer from "nodemailer";
class EmailProvider {
  private transport: any;

  /**
   * Importante!
   * Para enviar desde el servicio de google, basta con cambiar la configuracion
   * de la cuenta utilizando el siguiente link
   * https://myaccount.google.com/lesssecureapps?pli=1
   *
   * Luego deshabilitar esto:
   * https://accounts.google.com/DisplayUnlockCaptcha
   *
   * ¿Porque utilizar Google, y no otro SMTP para enviar correos?
   * Porque si se envian correos de forma reiterativas, tienden a caer en
   * la backlist del servidor.
   */

  constructor() {
    this.transport = nodemailer.createTransport({
      service: 'gmail',//smtp.gmail.com  //in place of service use host...
      secure: false,//true
      port: 25,//465
      auth: {
        user: 'prueba.patacon@gmail.com',
        pass: 'patacon1234'
      }, tls: {
        rejectUnauthorized: false
      }

    });


    /*
    _mailer = new MailPromise(
      'Gmail',
      'prueba.patacon@gmail.com',
      'patacon1234'
    );*/
  }

  /**
   * @author Patricio Quezada L.
   * @summary Metodo que permite enviar un Email.
   * @param to Persona a enviar
   * @param from Quien lo envia
   * @param subject Asunto
   * @param body cuerpo del mensaje
   * @param html Pantilla HTML
   * @param attachments Archivos adjuntos
   */
  async sendMail(
    _to: string,
    _from: string,
    _subject: string,
    _body: string,
    _html?: string,
    _attachments?: Array<any>
  ): Promise<void> {
    try {

      let mailOptions = {
        from: _from,
        to: _to,
        subject: _to,
        html: _body
      };

      this.transport.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          return error;
        } else {
          return "E-mail enviado com sucesso!";
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

}

export const Email = new EmailProvider();
