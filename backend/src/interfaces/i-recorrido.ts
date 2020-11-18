export interface IRecorrido {
  id_recorrido?: number;
  tipo_carga?: string;
  fecha_inicio: string;
  hora_inicio: string;
  fecha_termino: string;
  hora_termino: string;
  llegada_estimada: string;
  longitud_actual: number;
  latitud_actual: number;
  ref_chofer: string;
  ref_camion: string;
  ref_ruta: number;
}
