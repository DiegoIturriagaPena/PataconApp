export interface ChoferInterface {
    rut?: string;
    nombre?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    telefono?: number;
    disponibilidad?: string;
    estado?: boolean;
}

export class Chofer implements ChoferInterface {
    rut?: string;
    nombre?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    telefono?: number;
    disponibilidad?: string;
    estado?: boolean;

    constructor() {
        this.rut = '';
        this.nombre = '';
        this.apellido_paterno = '';
        this.apellido_materno = '';
        this.telefono = -1;
        this.disponibilidad = '';
        this.estado = true;
    }
}