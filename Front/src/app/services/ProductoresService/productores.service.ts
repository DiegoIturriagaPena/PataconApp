import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IProductor } from 'src/app/models/Productor/i-productor';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class ProductoresService{
  public static API_ROOT = 'https://osiris-api.tk/api';
  public static productores_GET = ProductoresService.API_ROOT + '/productores'
  public static productores_POST = ProductoresService.API_ROOT + '/productores'

  listaProductores: AngularFireList<any>;

  constructor(
    private http: HttpClient,
    
  ) { }


  // retorna la lista de todos los productores
  obtenerProductores(): Observable<any> {
    console.log()
    return this.http.get(ProductoresService.productores_GET, {});
  }

  insertarProductor(data: IProductor): Observable<any> {
    /*console.log("Insertando en Firebase");
    console.log(data);
    this.listaProductores.push({
      id_productor: data.id_productor,
      nombre: data.nombre,
      razon_social: data.razon_social,
      apellidos: data.apellidos,
      telefono: +data.telefono,
      telefono2: +data.telefono2,
      direccion: data.direccion,
    });*/
    return this.http.post(ProductoresService.productores_POST, data);

  }


}
