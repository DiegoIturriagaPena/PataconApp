export interface ProductorInterface {
    id?: number;
    nombre?: string;
    variedad?: string;
    cosecha?: string;
    calidad?: string;
    telefono?: number;
}

export class Productor implements ProductorInterface {
    id?: number;
    nombre?: string;
    variedad?: string;
    cosecha?: string;
    calidad?: string;
    telefono?: number;

    constructor() {
        this.id = -1;
        this.nombre = '';
        this.variedad = '';
        this.cosecha = '';
        this.calidad = '';
        this.telefono = -1;
    }
}