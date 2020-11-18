import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductor } from '../models/Productor/i-productor';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChoferInterface } from '../models/chofer';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Objetos para Connectus(SMS)
   */
  public static connectusUrl = 'https://api.connectus.cl/api_v1/send_sms';
  public static connectusHeadersObject: HttpHeaders = new HttpHeaders({
    'Authorization': "Basic ZWYxMmZlMzJlZWE0NGIyNzk5NGZhNGYzYjg5ZDE1MjU6ODQ4YWY2YWMwZTEwNGEwZWJlYjRkYTM1MmVlYjkxMjE=",
  });

  public static connectusHttpOptions = {
    headers: NotificationService.connectusHeadersObject,
  }
  /**
   * Objetos para firebase(Notificaciones Push)
   */
  private viajeCollectionName = 'viaje';
  private notificacionCollectionName = 'notificacion';
  private productoresCollectionName = 'usuario';
  private choferCollectionName = 'chofer';

  public static firebaseUrl = "https://firestore.googleapis.com/v1beta1/projects/pataconf/databases/(default)/documents/usuario";;
  public static firebaseSendUrl = "https://fcm.googleapis.com/fcm/send";
  public static firebaseHeadersObject: HttpHeaders = new HttpHeaders({
    'Authorization': 'key=AAAAAevkY5M:APA91bG1NHA9pXk85oK22IuP5hcFWezceYWM3QmjoysYiT8QaS6Lb3t5iq9Hq5XWH16GL-8iT8ie_HiGNmee6bAn57xIW55lsULuKQrOoZyOTYY3g6SKXcNyPUSVi-_qVa_fqvJxjCTc',
    'Content-Type': 'application/json',

  });
  public static firebaseHttpOptions = {
    headers: NotificationService.firebaseHeadersObject,
  }


  constructor(private db: AngularFirestore,
    private http: HttpClient,
    private afsAuth: AngularFireAuth
  ) {

  }

  insertarFirestore(recorrido: any, uid: string, nombreVina: string): Promise<DocumentReference> {
    return this.db.collection(this.viajeCollectionName).add({
      idChofer: recorrido.ref_chofer,
      idProductor: uid,
      estado: "Pendiente",
      envase: recorrido.envase,
      fechaInicio: this.parseFecha(recorrido.fecha_inicio),
      horaInicio: recorrido.hora_inicio,
      patente: recorrido.ref_camion,
      origen: "35.0779889,-71.2617361",
      origenTexto: "Patacon",
      destino: "-34.5839344,-70.9913457",
      destinoTexto: nombreVina,
      ubicacionActual: "-35.044307,-71.289814"

    })

  }

  /**
   * 
   * @author Raimundo Vásquez
   * @param data Contenido de la notificación
   * @param uid Usuario a la que se mandó
   * @param viajeid Referencia al viaje 
   */
  
  insertarNotificacionFirestore(data: any, uid: string, viajeid: string): Promise<DocumentReference> {
    let hoy = new Date();
    let hora = hoy.getHours();
    let minutos = hoy.getMinutes();
    let horaFinal = hora + ":" + minutos;
    console.log(horaFinal)
    return this.db.collection(this.notificacionCollectionName).add({
      cuerpo: data.body,
      fecha: this.parseFecha(hoy.toISOString()),
      hora: horaFinal,
      idProductor: uid,
      refViaje: viajeid,
      titulo: data.title

    })

  }

  /**
   * @author Raimundo Vásquez
   * @param fecha_inicio fecha en formato ISOString
   * Parsea la fecha para mandarla de manera correcta a firestore
   */
  parseFecha(fecha_inicio: any): string {

    let fecha = new Date(Date.parse(fecha_inicio));
    let mes = fecha.getMonth() + 1
    let fechaParseada = fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();
    console.log(fechaParseada);
    return fechaParseada;
  }

  /**
   * @author Raimundo Vásquez
   * Obtiene los usuarios de Firebase
   */
  obtenerUsuariosFirebase(): Observable<any> {
    return this.http.get(NotificationService.firebaseUrl);
  }

  /**
   * @author Raimundo Vásquez
   * @param data Cuerpo de la notificación
   * 
   * Función para enviar la notificación push
   */
  enviarPush(data): Observable<any> {
    return this.http.post(NotificationService.firebaseSendUrl, data, NotificationService.firebaseHttpOptions);
  }


  insertarProductorFirestore(productor: IProductor, uid: string, email: string): Promise<void> {
    return this.db.collection(this.productoresCollectionName).doc(uid).set({
      nombre: productor.nombre,
      apellido: productor.apellidos == null ? "" : productor.apellidos,
      rut: productor.rut,
      telefono: +productor.telefono,
      keyNot: '',
      correo: email,
      perfil: "Productor",
      uid: uid

    });
  }

  insertarChoferFirestore(chofer: ChoferInterface, rut: string):Promise<void>{
    return this.db.collection(this.choferCollectionName).doc(rut).set({
      nombre: chofer.nombre,
      apellido: chofer.apellido_materno == null ? chofer.apellido_paterno : chofer.apellido_paterno + " " + chofer.apellido_materno,
      numero: "+56" + chofer.telefono

    })
  }


  /**
   * @author Raimundo Vásquez, Christian Marchant
   * @param data Información del usuario
   * @summary Se crea un usuari Auth para firebase y el login de la app
   */
  crearUsuarioFirestore(data: any, productor: IProductor) {
    let email = data.email;
    let pass = data.pass;
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            //this.updateUserData(userData.user)
            console.log(userData.user)
          this.insertarProductorFirestore(productor, userData.user.uid, userData.user.email)
            .then(res => {
              console.log("Se insertó correctamente en Firestore");
            }).catch(err => {
              console.log("Se genera el fallo" + err)
            })
        }).catch(err => console.log(reject(err)))
    });
  }

  enviarSms(data): Observable<any>{
    return this.http.post(NotificationService.connectusUrl,data,NotificationService.connectusHttpOptions);
  }
}
