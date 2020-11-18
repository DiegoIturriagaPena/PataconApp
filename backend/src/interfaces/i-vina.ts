import { IUva } from './i-uva';
export interface IVina {
  id_vina?: number;
  nombre_vina?: string;
  ref_productor?: number;
  longitud_ubicacion?: number;
  latitud_ubicacion?: number;
  uvas?: IUva[];
}
