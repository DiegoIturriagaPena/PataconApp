export interface CamionInterface {
  patente?: string;
  capacidad_total?: number;
  estado?: string;
  carga?: string;
  dueno?: string;
  tipo?: string;
  fono_dueno?: number;
  id_gps?: number;  
}

export class Camion implements CamionInterface {
  patente?: string;
  capacidad_total?: number;
  estado?: string;
  carga?: string;
  dueno?: string;
  tipo?: string;
  fono_dueno?: number;
  id_gps?: number;

  constructor() {
    this.patente = '';
    this.capacidad_total = -1;
    this.estado = 'Detenido';
    this.carga = '';
    this.dueno = '';
    this.tipo = '';
    this.fono_dueno = -1;
    this.id_gps = -1;
  }
}