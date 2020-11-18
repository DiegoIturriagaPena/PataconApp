export interface IEvento {
  id_evento?: number;
  fecha: string;
  hora: string;
  link_mapa: string;
  descripcion?: string;
  tipo?: string;
  ref_recorrido: number;
}
