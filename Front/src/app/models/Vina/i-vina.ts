import { IUva } from './i-uva';

export interface vina {
    ref_productor?: number;
    id_vina?: number;
    tipo_cosecha?: string;
    uvas?: IUva[];   
    nombre_vina?: string;
    longitud_ubicacion?: number;
    latitud_ubicacion?: number;
}