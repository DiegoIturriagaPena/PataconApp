import { BackendApplication } from './application';
import { RolRepository, UsuarioRepository, CamionRepository, ChoferRepository, GpsRepository, RecorridoRepository, EventoRepository, ProductorRepository, VinaRepository, TipoUvaRepository, RutaRepository } from './repositories';
import { IRol } from './interfaces/i-rol';
import { Rol, Usuario, Camion, Chofer, Gps, Recorrido, Evento, Productor, Vina, TipoUva, Ruta } from './models';
import { DataSource } from 'loopback-datasource-juggler';
import { IUsuario } from './interfaces/i-usuario';
import { ICamion } from './interfaces/i-camion';
import { IChofer } from './interfaces/i-chofer';
import { Crypto } from './providers/crypto-provider';
import { IGps } from './interfaces/i-gps';
import { IRecorrido } from './interfaces/i-recorrido';
import { IEvento } from './interfaces/i-evento';
import { IProductor } from './interfaces/i-productor';
import { IVina } from './interfaces/i-vina';
import { ITipoUva } from './interfaces/i-tipo-uva';
import { IRuta } from './interfaces/i-ruta';


export async function seeder(args: string[]) {
  console.log('. :: :: Ejecutando seeder :: :: .');
  const app = new BackendApplication();
  await app.boot();
  const rolRepo = await app.getRepository(RolRepository);
  const userRepo = await app.getRepository(UsuarioRepository);
  let camionRepo = await app.getRepository(CamionRepository);
  let choferRepo = await app.getRepository(ChoferRepository);
  let gpsRepo = await app.getRepository(GpsRepository);
  let eventoRepo = await app.getRepository(EventoRepository);
  let recorridoRepo = await app.getRepository(RecorridoRepository);
  let productorRepo = await app.getRepository(ProductorRepository);
  let vinnaRepo = await app.getRepository(VinaRepository);
  let tipoUvaRepo = await app.getRepository(TipoUvaRepository);
  let rutaRepo = await app.getRepository(RutaRepository);

  console.log('#\t-> Creando roles\n');
  const roles: IRol[] = [{
    nombre: 'admin',
    descripcion: '┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴'
  },
  {
    nombre: 'supervisor',
    descripcion: '( ͡° ͜ʖ ͡°)'
  }];

  const adminRol = new Rol(roles[0]);
  const supervisorRol = new Rol(roles[1]);

  await rolRepo.create(adminRol);
  await rolRepo.create(supervisorRol);
  console.log(roles);

  //console.log('#\t-> Creando usuario:\n');

  const users: IUsuario[] = [
    { rut: '11111111-1', correo: 'admin@patacon.cl', password: '123456', nombres: 'administrador', apellido_paterno: '(☞ﾟヮﾟ)☞', apellido_materno: '☜(ﾟヮﾟ☜)', rol: 1 },
    { rut: '22222222-k', correo: 'supervisor1@patacon.cl', password: '654321', nombres: 'supervisor1', apellido_paterno: '(☞ﾟヮﾟ)☞', apellido_materno: '☜(ﾟヮﾟ☜)', rol: 2 },
    { rut: '33333333-3', correo: 'supervisor2@patacon.cl', password: 'hola', nombres: 'supervisor2', apellido_paterno: '(☞ﾟヮﾟ)☞', apellido_materno: '☜(ﾟヮﾟ☜)', rol: 2 }
  ];

  console.log('#\t-> Creando usuarios:\n');
  await Promise.all(users.map(async (u, index, array) => {
    const user = new Usuario(u);
    user.password = Crypto.encypt(user.password);
    await userRepo.create(user);
  })).then().catch(y => console.log(y));

  const gps: IGps[] = [
    // id:0 -> gps por defecto para cuando no se asigne un gps al crear camión
    { id: 0, modelo: "Sin GPS asignado", numero_chip: 0 },
    { id: 1, modelo: "TELTONIKA 1", numero_chip: 111111 },
    { id: 2, modelo: "TELTONIKA 2", numero_chip: 111111 },
    { id: 3, modelo: "TELTONIKA 3", numero_chip: 111111 },
    { id: 4, modelo: "TELTONIKA 4", numero_chip: 111111 },
    { id: 5, modelo: "TELTONIKA 5", numero_chip: 111111 },
    { id: 6, modelo: "TELTONIKA 6", numero_chip: 111111 },
    { id: 7, modelo: "TELTONIKA 7", numero_chip: 111111 },
    { id: 8, modelo: "TELTONIKA 8", numero_chip: 111111 },
    { id: 9, modelo: "TELTONIKA 9", numero_chip: 111111 },
    { id: 10, modelo: "TELTONIKA 10", numero_chip: 111111 },
    { id: 11, modelo: "TELTONIKA 11", numero_chip: 111111 },
    { id: 12, modelo: "TELTONIKA 12", numero_chip: 111111 },
    { id: 13, modelo: "TELTONIKA 13", numero_chip: 111111 },
    { id: 14, modelo: "TELTONIKA 14", numero_chip: 111111 },
    { id: 15, modelo: "TELTONIKA 15", numero_chip: 111111 },
    { id: 16, modelo: "TELTONIKA 16", numero_chip: 111111 },
    { id: 17, modelo: "TELTONIKA 17", numero_chip: 111111 },
    { id: 18, modelo: "TELTONIKA 18", numero_chip: 111111 },
    { id: 19, modelo: "TELTONIKA 19", numero_chip: 111111 },
    { id: 20, modelo: "TELTONIKA 20", numero_chip: 111111 },
    { id: 21, modelo: "TELTONIKA 21", numero_chip: 111111 },
    { id: 22, modelo: "TELTONIKA 22", numero_chip: 111111 },
    { id: 23, modelo: "TELTONIKA 23", numero_chip: 111111 },
    { id: 24, modelo: "TELTONIKA 24", numero_chip: 111111 },
    { id: 25, modelo: "TELTONIKA 25", numero_chip: 111111 },
    { id: 26, modelo: "TELTONIKA 26", numero_chip: 111111 },
    { id: 27, modelo: "TELTONIKA 27", numero_chip: 111111 },
    { id: 28, modelo: "TELTONIKA 28", numero_chip: 111111 },
    { id: 29, modelo: "TELTONIKA 29", numero_chip: 111111 },
    { id: 30, modelo: "TELTONIKA 30", numero_chip: 111111 },
    { id: 31, modelo: "TELTONIKA 31", numero_chip: 111111 },
    { id: 32, modelo: "TELTONIKA 32", numero_chip: 111111 },
    { id: 33, modelo: "TELTONIKA 33", numero_chip: 111111 },
    { id: 34, modelo: "TELTONIKA 34", numero_chip: 111111 },
    { id: 35, modelo: "TELTONIKA 35", numero_chip: 111111 },
    { id: 36, modelo: "TELTONIKA 36", numero_chip: 111111 },
    { id: 37, modelo: "TELTONIKA 37", numero_chip: 111111 },
    { id: 38, modelo: "TELTONIKA 38", numero_chip: 111111 },
    { id: 39, modelo: "TELTONIKA 39", numero_chip: 111111 },
    { id: 40, modelo: "TELTONIKA 40", numero_chip: 111111 },
    { id: 41, modelo: "TELTONIKA 41", numero_chip: 111111 },
    { id: 42, modelo: "TELTONIKA 42", numero_chip: 111111 },
    { id: 43, modelo: "TELTONIKA 43", numero_chip: 111111 },
    { id: 44, modelo: "TELTONIKA 44", numero_chip: 111111 },
    { id: 45, modelo: "TELTONIKA 45", numero_chip: 111111 },
    { id: 46, modelo: "TELTONIKA 46", numero_chip: 111111 },
    { id: 47, modelo: "TELTONIKA 47", numero_chip: 111111 },
    { id: 48, modelo: "TELTONIKA 48", numero_chip: 111111 },
    { id: 49, modelo: "TELTONIKA 49", numero_chip: 111111 },
    { id: 50, modelo: "TELTONIKA 50", numero_chip: 111111 },
    { id: 51, modelo: "TELTONIKA 51", numero_chip: 111111 },
    { id: 52, modelo: "TELTONIKA 52", numero_chip: 111111 },
    { id: 53, modelo: "TELTONIKA 53", numero_chip: 111111 },
    { id: 54, modelo: "TELTONIKA 54", numero_chip: 111111 },
    { id: 55, modelo: "TELTONIKA 55", numero_chip: 111111 },
    { id: 56, modelo: "TELTONIKA 56", numero_chip: 111111 },
    { id: 57, modelo: "TELTONIKA 57", numero_chip: 111111 },
    { id: 58, modelo: "TELTONIKA 58", numero_chip: 111111 },
    { id: 59, modelo: "TELTONIKA 59", numero_chip: 111111 },
    { id: 60, modelo: "TELTONIKA 60", numero_chip: 111111 },
    { id: 61, modelo: "TELTONIKA 61", numero_chip: 111111 },
    { id: 62, modelo: "TELTONIKA 62", numero_chip: 111111 },
    { id: 63, modelo: "TELTONIKA 63", numero_chip: 111111 },
    { id: 64, modelo: "TELTONIKA 64", numero_chip: 111111 },
    { id: 65, modelo: "TELTONIKA 65", numero_chip: 111111 },
    { id: 66, modelo: "TELTONIKA 66", numero_chip: 111111 },
    { id: 67, modelo: "TELTONIKA 67", numero_chip: 111111 },
    { id: 68, modelo: "TELTONIKA 68", numero_chip: 111111 },
    { id: 69, modelo: "TELTONIKA 69", numero_chip: 111111 },
    { id: 70, modelo: "TELTONIKA 70", numero_chip: 111111 },
    { id: 71, modelo: "TELTONIKA 71", numero_chip: 111111 },
    { id: 72, modelo: "TELTONIKA 72", numero_chip: 111111 },
    { id: 73, modelo: "TELTONIKA 73", numero_chip: 111111 },
    { id: 74, modelo: "TELTONIKA 74", numero_chip: 111111 },
    { id: 75, modelo: "TELTONIKA 75", numero_chip: 111111 },
    { id: 76, modelo: "TELTONIKA 76", numero_chip: 111111 },
    { id: 77, modelo: "TELTONIKA 77", numero_chip: 111111 },
    { id: 78, modelo: "TELTONIKA 78", numero_chip: 111111 },
    { id: 79, modelo: "TELTONIKA 79", numero_chip: 111111 },

  ]

  console.log('#\t-> Creando gps:\n');
  await Promise.all(gps.map(async (c, index, array) => {
    const gps = new Gps(c);
    await gpsRepo.create(gps);
  })).then().catch(y => console.log(y));



  /*const eventos: IEvento[] =
  [
    {id_evento:1,fecha:'2019-05-08 19:17:01',hora:'10:00',link_mapa:'string',descripcion:'string',tipo:'Saliendo',ref_recorrido:1},
    {id_evento:2,fecha:'2019-05-08 19:17:01',hora:'10:00',link_mapa:'string',descripcion:'string',tipo:'Saliendo',ref_recorrido:2},
    {id_evento:3,fecha:'2019-05-08 19:17:01',hora:'10:00',link_mapa:'string',descripcion:'string',tipo:'En ruta',ref_recorrido:4},
    {id_evento:4,fecha:'2019-05-08 19:17:01',hora:'10:00',link_mapa:'string',descripcion:'string',tipo:'Llegando',ref_recorrido:5},
    {id_evento:5,fecha:'2019-05-08 19:17:01',hora:'10:00',link_mapa:'string',descripcion:'string',tipo:'Desviado',ref_recorrido:6}
  ];

  console.log('#\t-> Creando eventos:\n');
    await Promise.all(eventos.map(async (c, index, array) => {
      const evento = new Evento(c);
      await eventoRepo.create(evento);
    }));*/


  // (en ruta, descargando, detenido).
  const camiones: ICamion[] = [
    { patente: 'FLPZ71', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '15133146-7', id_gps: 1 },
    { patente: 'JFSX69', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '10290304-8', id_gps: 2 },
    { patente: 'HWJX78', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '15631710-1', id_gps: 3 },
    { patente: 'FSSY83', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '16899649-7', id_gps: 4 },
    { patente: 'CV1711', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '15129712-9', id_gps: 5 },
    { patente: 'SV8981', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '11371039-K', id_gps: 6 },
    { patente: 'WZ7336', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '12783703-1', id_gps: 7 },
    { patente: 'DFBY17', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '15129899-0', id_gps: 8 },
    { patente: 'NN7448', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '17441099-2', id_gps: 9 },
    { patente: 'WC3968', estado: 'detenido', capacidad_total: 1000, carga: 5000, dueno: '14532484-K', id_gps: 10 },
    { patente: 'DKPS19', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '14519152-1', id_gps: 11 },
    { patente: 'BF6210', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '8163686-9', id_gps: 12 },
    { patente: 'PH8891', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '15130335-8', id_gps: 13 },
    { patente: 'XJ4803', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '12416571-7', id_gps: 14 },
    { patente: 'KF1174', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '5333557-8', id_gps: 15 },
    { patente: 'YJ1813', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '7858493-9', id_gps: 16 },
    { patente: 'PG2229', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '14049590-5', id_gps: 17 },
    { patente: 'KR5931', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '7761873-2', id_gps: 18 },
    { patente: 'BC9590', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '12542692-1', id_gps: 19 },
    { patente: 'BT1308', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '18560866-2', id_gps: 20 },
    { patente: 'KJ7744', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '16582529-2', id_gps: 21 },
    { patente: 'SL6206', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '9863071-6', id_gps: 22 },
    { patente: 'ST1194', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '5381311-9', id_gps: 23 },
    { patente: 'RA4761', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '18966709-4', id_gps: 24 },
    { patente: 'NK9231', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '11286699-K', id_gps: 25 },
    { patente: 'NV6174', estado: 'detenido', capacidad_total: 1000, carga: 1000, dueno: '17192705-6', id_gps: 26 },
    { patente: 'CA2781', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '8769009-1', id_gps: 27 },
    { patente: 'DL7744', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '14278753-9', id_gps: 28 },
    { patente: 'ER6284', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '16594908-0', id_gps: 29 },
    { patente: 'HC6312', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '8652711-1', id_gps: 30 },
    { patente: 'YE1246', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '16589502-9', id_gps: 31 },
    { patente: 'NX2892', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '15754262-1', id_gps: 32 },
    { patente: 'BZ4272', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '17967966-3', id_gps: 33 },
    { patente: 'WW8990', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '12590838-1', id_gps: 34 },
    { patente: 'KV2987', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '18253478-1', id_gps: 35 },
    { patente: 'WW9137', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '6951331-K', id_gps: 36 },
    { patente: 'GPGP26', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '11674299-3', id_gps: 37 },
    { patente: 'GWFH18', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '8942267-1', id_gps: 38 },
    { patente: 'DX3802', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '10128924-9', id_gps: 39 },
    { patente: 'HR2589', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '13858152-7', id_gps: 40 },
    { patente: 'EC6108', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '15130803-1', id_gps: 41 },
    { patente: 'BGDH56', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '14054052-8', id_gps: 42 },
    { patente: 'ND2828', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '16857401-0', id_gps: 43 },
    { patente: 'KKYV90', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '13722280-9', id_gps: 44 },
    { patente: 'ZL8860', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '9695159-0', id_gps: 45 },
    { patente: 'FWXD48', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '16731863-0', id_gps: 46 },
    { patente: 'KVJJ86', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '13805047-5', id_gps: 47 },
    { patente: 'KU9114', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '7482444-7', id_gps: 48 },
    { patente: 'WA8500', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '12779767-6', id_gps: 49 },
    { patente: 'CPFP35', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '7128811-0', id_gps: 50 },
    { patente: 'SU7428', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '9525326-1', id_gps: 51 },
    { patente: 'RB5271', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '13574261-9', id_gps: 52 },
    { patente: 'FJ9781', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '10544911-9', id_gps: 53 },
    { patente: 'KA3066', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '9367938-5', id_gps: 54 },
    { patente: 'BH2003', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '17441196-4', id_gps: 55 },
    { patente: 'FE4452', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '19889764-1', id_gps: 56 },
    { patente: 'NT8374', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '10899123-2', id_gps: 57 },
    { patente: 'DB2552', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '10536996-4', id_gps: 58 },
    { patente: 'NN9004', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '11982770-1', id_gps: 59 },
    { patente: 'BVRJ20', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: 'V-13549214', id_gps: 60 },
    { patente: 'ZK5767', estado: 'detenido', capacidad_total: 1000, carga: 500, dueno: '18349719-7', id_gps: 61 },
    { patente: 'CVTH68', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '13352067-8', id_gps: 62 },
    { patente: 'CS7512', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '17039773-8', id_gps: 63 },
    { patente: 'TL2915', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '15127617-2', id_gps: 64 },
    { patente: 'HLLF21', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '10517892-1', id_gps: 65 },
    { patente: 'PE7120', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '9391691-3', id_gps: 66 },
    { patente: 'DL8492', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '8765432-1', id_gps: 67 },
    { patente: 'GFHB19', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '19105993-K', id_gps: 68 },
    { patente: 'CW6438', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '13777008-3', id_gps: 69 },
    { patente: 'GWTK29', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '12588444-K', id_gps: 70 },
    { patente: 'JKDZ59', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '17362986-9', id_gps: 71 },
    { patente: 'YX2894', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '13303803-5', id_gps: 72 },
    { patente: 'CZ9283', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '13350899-6', id_gps: 73 },
    { patente: 'XJ6779', estado: 'detenido', capacidad_total: 1000, carga: 8000, dueno: '4967779-0', id_gps: 74 }
  ];

  console.log('#\t-> Creando camiones:\n');
  await Promise.all(camiones.map(async (c, index, array) => {
    const camion = new Camion(c);
    await camionRepo.create(camion);
  })).then().catch(y => console.log(y));


  const choferes: IChofer[] = [
    { rut: '15133146-7', nombre: 'Oscar', apellido_paterno: 'Urzua', apellido_materno: '', telefono: 977624821, disponibilidad: 'Disponible', estado: true },
    { rut: '10290304-8', nombre: 'Gabriel', apellido_paterno: 'Rojas', apellido_materno: '', telefono: 973600231, disponibilidad: 'Disponible', estado: true },
    { rut: '15631710-1', nombre: 'Juan', apellido_paterno: 'González', apellido_materno: '', telefono: 933128642, disponibilidad: 'Disponible', estado: true },
    { rut: '16899649-7', nombre: 'Pedro', apellido_paterno: 'Rojas', apellido_materno: '', telefono: 932690351, disponibilidad: 'Disponible', estado: true },
    { rut: '15129712-9', nombre: 'Sergio', apellido_paterno: 'Riquelme', apellido_materno: '', telefono: 982182627, disponibilidad: 'Disponible', estado: true },
    { rut: '11371039-K', nombre: 'Cristian', apellido_paterno: 'Lazo', apellido_materno: '', telefono: 990732102, disponibilidad: 'Disponible', estado: true },
    { rut: '12783703-1', nombre: 'Gabriel', apellido_paterno: 'Barrientos', apellido_materno: '', telefono: 940204115, disponibilidad: 'Disponible', estado: true },
    { rut: '15129899-0', nombre: 'Andres', apellido_paterno: 'Vergara', apellido_materno: '', telefono: 931900044, disponibilidad: 'Disponible', estado: true },
    { rut: '17441099-2', nombre: 'Carlos', apellido_paterno: 'Diaz', apellido_materno: 'Matuz', telefono: 994159090, disponibilidad: 'Disponible', estado: true },
    { rut: '14532484-K', nombre: 'Victor', apellido_paterno: 'Avila', apellido_materno: '', telefono: 944369837, disponibilidad: 'Disponible', estado: true },
    { rut: '14519152-1', nombre: 'Hugo', apellido_paterno: 'Oyarce', apellido_materno: '', telefono: 935013823, disponibilidad: 'Disponible', estado: true },
    { rut: '8163686-9', nombre: 'Gabriel', apellido_paterno: 'González', apellido_materno: '', telefono: 984292180, disponibilidad: 'Disponible', estado: true },
    { rut: '15130335-8', nombre: 'Claudio', apellido_paterno: 'Jaña', apellido_materno: '', telefono: 983887264, disponibilidad: 'Disponible', estado: true },
    { rut: '12416571-7', nombre: 'Manuel', apellido_paterno: 'Salinas', apellido_materno: '', telefono: 984406320, disponibilidad: 'Disponible', estado: true },
    { rut: '5333557-8', nombre: 'Victor', apellido_paterno: 'Gomez', apellido_materno: 'Sanchez', telefono: 988682051, disponibilidad: 'Disponible', estado: true },
    { rut: '7858493-9', nombre: 'Victor', apellido_paterno: 'Aliaga', apellido_materno: 'Guajardo', telefono: 978833946, disponibilidad: 'Disponible', estado: true },
    { rut: '14049590-5', nombre: 'Ariel', apellido_paterno: 'Cabrera', apellido_materno: 'Piña', telefono: 971058778, disponibilidad: 'Disponible', estado: true },
    { rut: '7761873-2', nombre: 'Isaias', apellido_paterno: 'Leon', apellido_materno: 'Bravo', telefono: 931921237, disponibilidad: 'Disponible', estado: true },
    { rut: '12542692-1', nombre: 'Juan', apellido_paterno: 'Lopez', apellido_materno: '', telefono: 973918448, disponibilidad: 'Disponible', estado: true },
    { rut: '18560866-2', nombre: 'Arturo', apellido_paterno: 'Cabrera', apellido_materno: '', telefono: 996780180, disponibilidad: 'Disponible', estado: true },
    { rut: '16582529-2', nombre: 'Jose', apellido_paterno: 'Zuñiga', apellido_materno: '', telefono: 999670897, disponibilidad: 'Disponible', estado: true },
    { rut: '9863071-6', nombre: 'Jose', apellido_paterno: 'Vergara', apellido_materno: '', telefono: 938491655, disponibilidad: 'Disponible', estado: true },
    { rut: '5381311-9', nombre: 'Ramiro', apellido_paterno: 'Sepulveda', apellido_materno: '', telefono: 982284759, disponibilidad: 'Disponible', estado: true },
    { rut: '18966709-4', nombre: 'Gustavo', apellido_paterno: 'Valenzuela', apellido_materno: '', telefono: 934207953, disponibilidad: 'Disponible', estado: true },
    { rut: '11286699-K', nombre: 'Jose', apellido_paterno: 'Moraga', apellido_materno: '', telefono: 994997946, disponibilidad: 'Disponible', estado: true },
    { rut: '17192705-6', nombre: 'Joaquin', apellido_paterno: 'Espinoza', apellido_materno: '', telefono: 973147054, disponibilidad: 'Disponible', estado: true },
    { rut: '8769009-1', nombre: 'Oscar', apellido_paterno: 'Gutierrez', apellido_materno: '', telefono: 988138832, disponibilidad: 'Disponible', estado: true },
    { rut: '14278753-9', nombre: 'Luis', apellido_paterno: 'Salinas', apellido_materno: '', telefono: 998336096, disponibilidad: 'Disponible', estado: true },
    { rut: '16594908-0', nombre: 'Jhonnson', apellido_paterno: 'Reyes', apellido_materno: 'Barrios', telefono: 976607873, disponibilidad: 'Disponible', estado: true },
    { rut: '8652711-1', nombre: 'Joaquin', apellido_paterno: 'Santos', apellido_materno: 'Alfaro', telefono: 982793584, disponibilidad: 'Disponible', estado: true },
    { rut: '16589502-9', nombre: 'Victor', apellido_paterno: 'San Martin', apellido_materno: '', telefono: 962403154, disponibilidad: 'Disponible', estado: true },
    { rut: '15754262-1', nombre: 'Samuel', apellido_paterno: 'Tapia', apellido_materno: '', telefono: 999475096, disponibilidad: 'Disponible', estado: true },
    { rut: '17967966-3', nombre: 'Ruben', apellido_paterno: 'Chamorro', apellido_materno: '', telefono: 992700433, disponibilidad: 'Disponible', estado: true },
    { rut: '12590838-1', nombre: 'David', apellido_paterno: 'Espinoza', apellido_materno: '', telefono: 965802943, disponibilidad: 'Disponible', estado: true },
    { rut: '18253478-1', nombre: 'Claudio', apellido_paterno: 'Guerra', apellido_materno: 'Araya', telefono: 965802943, disponibilidad: 'Disponible', estado: true },
    { rut: '6951331-K', nombre: 'Miguel', apellido_paterno: 'Cerda', apellido_materno: '', telefono: 932077273, disponibilidad: 'Disponible', estado: true },
    { rut: '11674299-3', nombre: 'Mario', apellido_paterno: 'Herrera', apellido_materno: '', telefono: 962486247, disponibilidad: 'Disponible', estado: true },
    { rut: '8942267-1', nombre: 'Alejandro', apellido_paterno: 'Hormazabal', apellido_materno: '', telefono: 995686497, disponibilidad: 'Disponible', estado: true },
    { rut: '10128924-9', nombre: 'Alberto', apellido_paterno: 'Muñoz', apellido_materno: 'Inzunza', telefono: 989260616, disponibilidad: 'Disponible', estado: true },
    { rut: '13858152-7', nombre: 'Rodrigo', apellido_paterno: 'Avila', apellido_materno: 'Roman', telefono: 993208542, disponibilidad: 'Disponible', estado: true },
    { rut: '15130803-1', nombre: 'Miguel', apellido_paterno: 'Villacura', apellido_materno: 'Neira', telefono: 933461191, disponibilidad: 'Disponible', estado: true },
    { rut: '14054052-8', nombre: 'Ricardo', apellido_paterno: 'Garrido', apellido_materno: 'A.', telefono: 934043715, disponibilidad: 'Disponible', estado: true },
    { rut: '16857401-0', nombre: 'Sebastian', apellido_paterno: 'Rebolledo', apellido_materno: '', telefono: 982535692, disponibilidad: 'Disponible', estado: true },
    { rut: '13722280-9', nombre: 'Bartolome', apellido_paterno: 'Rodriguez', apellido_materno: '', telefono: 961295933, disponibilidad: 'Disponible', estado: true },
    { rut: '9695159-0', nombre: 'Luis', apellido_paterno: 'Aguilera', apellido_materno: '', telefono: 950010481, disponibilidad: 'Disponible', estado: true },
    { rut: '16731863-0', nombre: 'Pedro Sebastian', apellido_paterno: 'Bravo', apellido_materno: '', telefono: 995470011, disponibilidad: 'Disponible', estado: true },
    { rut: '13805047-5', nombre: 'Fernando', apellido_paterno: 'Perez', apellido_materno: '', telefono: 964392739, disponibilidad: 'Disponible', estado: true },
    { rut: '7482444-7', nombre: 'Roberto', apellido_paterno: 'Ramon', apellido_materno: 'Rioseco', telefono: 984469408, disponibilidad: 'Disponible', estado: true },
    { rut: '12779767-6', nombre: 'Gerardo', apellido_paterno: 'Canales', apellido_materno: '', telefono: 974038177, disponibilidad: 'Disponible', estado: true },
    { rut: '7128811-0', nombre: 'Rene', apellido_paterno: 'Garrido', apellido_materno: '', telefono: 982530996, disponibilidad: 'Disponible', estado: true },
    { rut: '9525326-1', nombre: 'Hernan', apellido_paterno: 'Navarro', apellido_materno: '', telefono: 987522754, disponibilidad: 'Disponible', estado: true },
    { rut: '13574261-9', nombre: 'Rodrigo', apellido_paterno: 'Muñoz', apellido_materno: 'Abrigo', telefono: 995008269, disponibilidad: 'Disponible', estado: true },
    { rut: '10544911-9', nombre: 'Enrique', apellido_paterno: 'Cabrera', apellido_materno: '', telefono: 991336855, disponibilidad: 'Disponible', estado: true },
    { rut: '9367938-5', nombre: 'Hector', apellido_paterno: 'Meza', apellido_materno: 'Araya', telefono: 944693193, disponibilidad: 'Disponible', estado: true },
    { rut: '17441196-4', nombre: 'Felipe', apellido_paterno: 'Salinas', apellido_materno: '', telefono: 934998133, disponibilidad: 'Disponible', estado: true },
    //{rut:'', nombre:'Victor', apellido_paterno:'Gonzalez', apellido_materno:'Flores', telefono:957702998
    { rut: '10899123-2', nombre: 'Robinson', apellido_paterno: 'Vergara', apellido_materno: '', telefono: 950016936, disponibilidad: 'Disponible', estado: true },
    { rut: '10536996-4', nombre: 'Luis', apellido_paterno: 'Paredes', apellido_materno: '', telefono: 984302786, disponibilidad: 'Disponible', estado: true },
    { rut: '11982770-1', nombre: 'Alejandro', apellido_paterno: 'Vasquez', apellido_materno: '', telefono: 988873069, disponibilidad: 'Disponible', estado: true },
    { rut: 'V-13549214', nombre: 'Wilmer', apellido_paterno: 'Niño', apellido_materno: '', telefono: 937256091, disponibilidad: 'Disponible', estado: true },
    { rut: '18349719-7', nombre: 'Johan', apellido_paterno: 'Pardo', apellido_materno: 'Tapia', telefono: 982178619, disponibilidad: 'Disponible', estado: true },
    { rut: '13352067-8', nombre: 'Sandro', apellido_paterno: 'Miranda', apellido_materno: 'Rivera', telefono: 986586298, disponibilidad: 'Disponible', estado: true },
    { rut: '17039773-8', nombre: 'Mauricio', apellido_paterno: 'Soto', apellido_materno: '', telefono: 997019723, disponibilidad: 'Disponible', estado: true },
    { rut: '15127617-2', nombre: 'Samuel', apellido_paterno: 'Trejo', apellido_materno: '', telefono: 990197955, disponibilidad: 'Disponible', estado: true },
    { rut: '10517892-1', nombre: 'Joel', apellido_paterno: 'Prieto', apellido_materno: 'Uribe', telefono: 965972852, disponibilidad: 'Disponible', estado: true },
    { rut: '9391691-3', nombre: 'Luis', apellido_paterno: 'Soto', apellido_materno: 'Moya', telefono: 933808225, disponibilidad: 'Disponible', estado: true },
    //{rut:'', nombre:'Patricio', apellido_paterno:'Castro', apellido_materno:'', telefono:966830544
    { rut: '19105993-K', nombre: 'Jorge', apellido_paterno: 'Guzman', apellido_materno: '', telefono: 957025291, disponibilidad: 'Disponible', estado: true },
    { rut: '13777008-3', nombre: 'Joaquin', apellido_paterno: 'Jimenes', apellido_materno: '', telefono: 995926182, disponibilidad: 'Disponible', estado: true },
    { rut: '12588444-K', nombre: 'Ricardo', apellido_paterno: 'Avila', apellido_materno: 'Roman', telefono: 997604247, disponibilidad: 'Disponible', estado: true },
    { rut: '17362986-9', nombre: 'Jonathan', apellido_paterno: 'Rodriguez', apellido_materno: '', telefono: 974526596, disponibilidad: 'Disponible', estado: true },
    { rut: '13303803-5', nombre: 'Victor', apellido_paterno: 'Valenzuela', apellido_materno: '', telefono: 947457139, disponibilidad: 'Disponible', estado: true },
    { rut: '13350899-6', nombre: 'Manuel', apellido_paterno: 'Rebolledo', apellido_materno: '', telefono: 959771392, disponibilidad: 'Disponible', estado: true },
    { rut: '4967779-0', nombre: 'Carlos', apellido_paterno: 'Salas', apellido_materno: 'Luna', telefono: 945426257, disponibilidad: 'Disponible', estado: true }
  ];

  const z = await Promise.all(choferes.map(async chofer => {
    //console.log(chofer);
    const c = new Chofer(chofer);
    await choferRepo.create(c).then();
  })).then().catch(e => {
    console.log('Error Choferes: ' + e);
  });

  const productores: IProductor[] = [
    { nombre: 'Inversiones El Cortijo', rut: '76035656-5', variedad: "CHARD", cosecha: "MAQUINA", calidad: "GENERICO", telefono: 999921136 },
    { nombre: 'AGR. Y FRUT. LA ESPERANZA', rut: '79669990-6', variedad: "CHARD", cosecha: "MAQUINA", calidad: "GENERICO", telefono: 957922758 },
    { nombre: 'AGR. SAN EDUARDO', rut: '76009204-5', variedad: "CHARD", cosecha: "MAQUINA", calidad: "GENERICO", telefono: 984722596 },
    { nombre: 'AGR. Santa Elvira (Chapeta Correa) Tintorera', rut: '76227654-2', variedad: "CHARD", cosecha: "MAQUINA", calidad: "GENERICO", telefono: 986178286 },
    { nombre: 'AGR. LA PATAGUILLA (Chapeta Correa)', rut: '76220035-K', variedad: "CHARD", cosecha: "MAQUINA", calidad: "GENERICO", telefono: 984775979 },
  ]
  console.log('#\t-> Creando Productores:\n');
  const p = await Promise.all(productores.map(async productors => {
    //console.log(productor);
    const c = new Productor(productors);
    await productorRepo.create(c).then();
  })).then().catch(e => {
    console.log('Error Productores: ' + e);
  });

  const vinnas: IVina[] = [
    { nombre_vina: 'Viña Cortijo', ref_productor: 1, longitud_ubicacion: -71.269643, latitud_ubicacion: -34.310307 },
    { nombre_vina: 'Viña La esperanza', ref_productor: 2, longitud_ubicacion: -71.281260, latitud_ubicacion: -34.310285 },
    { nombre_vina: 'Viña San Eduardo', ref_productor: 3, longitud_ubicacion: -71.3846474, latitud_ubicacion: -34.6508629 },
    { nombre_vina: 'Viña Santa Elvira', ref_productor: 4, longitud_ubicacion: -71.319871, latitud_ubicacion: -34.644975 },
    { nombre_vina: 'Viña La pataguilla', ref_productor: 5, longitud_ubicacion: -71.398504, latitud_ubicacion: -34.665658 },
  ]
  console.log('#\t-> Creando Vinnas:\n');
  const v = await Promise.all(vinnas.map(async vina => {
    //console.log(vina);
    const c = new Vina(vina);
    await vinnaRepo.create(c).then();
  })).then().catch(e => {
    console.log('Error Vinnas: ' + e);
  });

  const tipoUva: ITipoUva[] = [
    { tipo_uva: 'Blanco', descripcion: "Mucha Uva" },
    { tipo_uva: 'Tinto', descripcion: "Poca Uva" }
  ]

  console.log('#\t-> Creando Tipos de Uvas:\n');
  const t = await Promise.all(tipoUva.map(async tu => {
    //console.log(tu);
    const c = new TipoUva(tu);
    await tipoUvaRepo.create(c).then();
  })).then().catch(e => {
    console.log('Error Tipo Uva: ' + e);
  });

  const rutas: IRuta[] = [
    { ref_vinna: 1, longitud_inicio: -34.310307, latitud_inicio: -71.269643, longitud_destino: -35.0782921, latitud_destino: -71.2601285, duracion_aprox: '1 h 32 min' },
    { ref_vinna: 2, longitud_inicio: -34.310285, latitud_inicio: -71.281260, longitud_destino: -35.0782921, latitud_destino: -71.2601285, duracion_aprox: '1 h 31 min' },
    { ref_vinna: 3, longitud_inicio: -34.6508629, latitud_inicio: -71.3846474, longitud_destino: -35.0782921, latitud_destino: -71.2601285, duracion_aprox: '1 h 35 min' },
    { ref_vinna: 4, longitud_inicio: -34.644975, latitud_inicio: -71.319871, longitud_destino: -35.0782921, latitud_destino: -71.2601285, duracion_aprox: '1 h 33 min' },
    { ref_vinna: 5, longitud_inicio: -34.665658, latitud_inicio: -71.398504, longitud_destino: -35.0782921, latitud_destino: -71.2601285, duracion_aprox: '1 h 31 min' },
  ]
  console.log('#\t-> Creando Rutas:\n');
  const r = await Promise.all(rutas.map(async ruta => {
    //console.log(ruta);
    const c = new Ruta(ruta);
    await rutaRepo.create(c).then();
  })).then().catch(e => {
    console.log('Error Ruta: ' + e);
  });



  //console.log ('#\t -> Choferes creados.\n')
  /**
  const adminUser = new Usuario(users[0]);
  adminUser.password = Crypto.encypt(adminUser.password);
  adminUser.rol = 0;
  await userRepo.create(adminUser);
  console.log(users);
  */
  const recorridos: IRecorrido[] = [
    { tipo_carga: 'CARIG', fecha_inicio: '2019-05-08 19:24:08', hora_inicio: '20:40', fecha_termino: '2019-05-08 19:24:08', hora_termino: '22:45', llegada_estimada: '2019-05-08 19:24:08', longitud_actual: 0, latitud_actual: 0, ref_chofer: '12590838-1', ref_camion: 'BC9590', ref_ruta: 1 },
    { tipo_carga: 'TTRO', fecha_inicio: '2019-05-08 19:24:08', hora_inicio: '20:50', fecha_termino: '2019-05-08 19:24:08', hora_termino: '23:56', llegada_estimada: '2019-05-08 19:24:08', longitud_actual: 0, latitud_actual: 0, ref_chofer: '9367938-5', ref_camion: 'BF6210', ref_ruta: 2 },
    { tipo_carga: 'CHARD', fecha_inicio: '2019-05-08 19:24:08', hora_inicio: '10:30', fecha_termino: '2019-05-08 19:24:08', hora_termino: '16:40', llegada_estimada: '2019-05-08 19:24:08', longitud_actual: 0, latitud_actual: 0, ref_chofer: '15127617-2', ref_camion: 'BGDH56', ref_ruta: 3 },
    { tipo_carga: 'TTRO', fecha_inicio: '2019-05-08 19:24:08', hora_inicio: '12:06', fecha_termino: '2019-05-08 19:24:08', hora_termino: '17:56', llegada_estimada: '2019-05-08 19:24:08', longitud_actual: 0, latitud_actual: 0, ref_chofer: '13303803-5', ref_camion: 'BH2003', ref_ruta: 4 },
    { tipo_carga: 'CHARD', fecha_inicio: '2019-05-08 19:24:08', hora_inicio: '13:43', fecha_termino: '2019-05-08 19:24:08', hora_termino: '19:46', llegada_estimada: '2019-05-08 19:24:08', longitud_actual: 0, latitud_actual: 0, ref_chofer: '7482444-7', ref_camion: 'BT1308', ref_ruta: 5 },
    { tipo_carga: 'TTRO', fecha_inicio: '2019-05-08 19:24:08', hora_inicio: '16:48', fecha_termino: '2019-05-08 19:24:08', hora_termino: '22:40', llegada_estimada: '2019-05-08 19:24:08', longitud_actual: 0, latitud_actual: 0, ref_chofer: '10517892-1', ref_camion: 'BVRJ20', ref_ruta: 2 }
  ];

  console.log('#\t-> Creando recorridos:\n');
  await Promise.all(recorridos.map(async (r, index, array) => {
    const recorrido = new Recorrido(r);
    await recorridoRepo.create(recorrido);
  })).then().catch(y => console.log(y));

  const eventos: IEvento[] =
    [
      { fecha: '2019-05-08 19:17:01', hora: '10:00', link_mapa: 'www.linkmapa1.cl', descripcion: 'Descripcion1', tipo: 'Saliendo', ref_recorrido: 1 },
      { fecha: '2019-05-08 19:17:01', hora: '12:30', link_mapa: 'www.linkmapa2.cl', descripcion: 'Descripcion2', tipo: 'Saliendo', ref_recorrido: 2 },
      { fecha: '2019-05-08 19:17:01', hora: '18:50', link_mapa: 'www.linkmapa3.cl', descripcion: 'Descripcion3', tipo: 'En ruta', ref_recorrido: 3 },
      { fecha: '2019-05-08 19:17:01', hora: '22:20', link_mapa: 'www.linkmapa4.cl', descripcion: 'Descripcion4', tipo: 'Llegando', ref_recorrido: 4 },
      { fecha: '2019-05-08 19:17:01', hora: '11:30', link_mapa: 'www.linkmapa5.cl', descripcion: 'Descripcion5', tipo: 'Desviado', ref_recorrido: 5 },
      { fecha: '2019-05-08 19:17:01', hora: '13:30', link_mapa: 'www.linkmapa6.cl', descripcion: 'Descripcion6', tipo: 'Desviado', ref_recorrido: 6 }
    ];

  console.log('#\t-> Creando eventos:\n');
  const b = await Promise.all(eventos.map(async evento => {
    const ev = new Gps(evento);
    await eventoRepo.create(ev).then();
  })).then().catch(e => {
    console.log('Error evento: ' + e);
  });

  process.exit(0);
}

seeder(process.argv).catch(err => {
  process.exit(1);
});
