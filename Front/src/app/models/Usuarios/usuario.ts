export interface IUser {
    rut?: string;
    nombres?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    username?: string;
    password?: string;
    password_generated?: boolean;
    password_set?: boolean;
    correo?: string;
    telefono?: number;
    estado?: number;
    rol?: number;
}

export class User implements IUser {
    rut?: string;
    nombres?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    username?: string;
    password?: string;
    password_generated?: boolean;
    password_set?:boolean;
    correo?: string;
    telefono?: number;
    estado?: number;
    rol?: number;

    constructor() {
        this.rut = '';
        this.nombres = '';
        this.apellido_paterno = '';
        this.apellido_materno = '';
        this.username = '';
        this.password_generated = false;
        this.password_set = false;
        this.correo = '';
        this.estado = 1;
    }

}