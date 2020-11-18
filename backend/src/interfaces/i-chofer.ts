export interface IChofer {
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  telefono: number;
  disponibilidad?: string;
  estado?: boolean;
}
