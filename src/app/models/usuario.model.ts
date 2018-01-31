export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public telefono?: string,
        public direccion?: string,
        public area?: string,
        public creado?: string,
        public modificado?: string,
        public _id?: string
    ) { }
}