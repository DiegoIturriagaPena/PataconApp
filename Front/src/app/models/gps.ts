export interface GpsInterface {
    id?: number;
    modelo?: string;
    numero_chip?: number;
}

export class Gps implements GpsInterface {
    id?: number;
    modelo?: string;
    numero_chip?: number;

    constructor() {
        this.id = -1;
        this.modelo = '';
        this.numero_chip = -1;
    }
}