import { callbackPromise } from "nodemailer/lib/shared";

const turf = require('@turf/turf');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDjYehZgzIWJS8WceZM5qwWXVrqfAvfu8o'
});
const polyline = require('@mapbox/polyline');



let limpiarWaypoints = (waypoints: any) => {
  let newWaypoints = [];
  for (const waypoint of waypoints) {
    newWaypoints.push(waypoint.location);
  }
  return newWaypoints;
}
/**
 * @author Roberto Ureta & Raimundo Vasquez
 * Verifica la distancia entre la ruta y la posicion del Gps
 * @param data
 */
export let verificarDistanciaRuta = (data: any, callback: any) => {
  let nuevoEstado: any = "";
  let posGps = turf.point([data.lat, data.lng]);
  console.log('Entre aqui');
  console.log(data.waypoints);
  let waypoints = limpiarWaypoints(data.waypoints);
  nuevoEstado = googleMapsClient.directions({
    origin: [data.ruta.latitud_inicio, data.ruta.longitud_inicio],
    destination: [data.ruta.latitud_destino, data.ruta.longitud_destino],
    waypoints: waypoints,
    mode: 'driving'
  }, function (err: any, response: any) {
    //console.log('ela');
    if (!err) {
      //console.log(response);
      let puntosEncoded = response.json.routes[0].overview_polyline.points;
      let puntosDecoded = polyline.decode(puntosEncoded);
      //console.log(puntosDecoded);
      let linea = turf.lineString(puntosDecoded);
      //console.log(linea);
      let distancia = turf.pointToLineDistance(posGps, linea, { units: 'kilometers' });
      console.log('distancia: ', distancia);
      if (!(distancia < 0.050)) {
        console.log('Desviado');
        callback('Desviado', null);
      }
      else {
        console.log('En ruta');
        callback('En ruta', null);
      }
    } else {
      console.log("errorcito");
      console.log(err);
      callback(null, err);
    }
  });
}


/**
 * @author Roberto Ureta
 * Revisa la posicion del gps devolviendo cierto estado dependiendo donde se encuentre.
 * @param data Contiene la posicion de origen y destino de la ruta.
 */
export let verificarPos = (data: any, callback: any) => {
  data = JSON.parse(data)
  let posGps = turf.point([data.lat, data.lng]);
  //console.log(posGps);
  let radius = 0.1;
  let options = { steps: 5, units: 'kilometers', properties: {} };
  let centerOrigen = [data.ruta.latitud_inicio, data.ruta.longitud_inicio];
  console.log(centerOrigen);
  let circleOrigen = turf.circle(centerOrigen, radius, options);
  //Coordenadas Patacon
  //let centerDestino = [-35.0779933, -71.2595474];
  let centerDestino = [data.ruta.latitud_destino, data.ruta.longitud_destino];
  console.log(centerDestino);
  let circleDestino = turf.circle(centerDestino, radius, options);

  //origen (generalmente productor)
  if (turf.inside(posGps, circleOrigen)) {
    if (data.estado != 'Saliendo') {
      console.log('Saliendo');
      callback('Saliendo');
    }
  }
  //destino (generalmente patacon)
  else if (turf.inside(posGps, circleDestino)) {
    if (data.estado != 'Llegando') {
      console.log('Llegando');
      callback('Llegando');
    }
  }
  else {
    verificarDistanciaRuta(data, (estadoObtenido: string, err: any) => {
      if (!err) {
        console.log('estadito', estadoObtenido);
        if (estadoObtenido !== "") {
          console.log('nuevo estado valido: ', estadoObtenido);
          console.log('estado anterioir: ', data.estado);
          if (estadoObtenido === 'En ruta' && data.estado !== 'En ruta') {
            console.log('Entre a en ruta');
            callback('En ruta');
          }
          else if (estadoObtenido === 'Desviado' && data.estado !== 'Desviado') {
            console.log('Entre a desviado');
            callback('Desviado');
          }
        }
      }
    });
  }
}
