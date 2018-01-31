export class Notificacion {
    constructor(
        public asignado?: string,
        public ticket?: string,
        public cobertura?: string,
        public estado?: string,
        public creado?: number,
        public usuario?: string,
        public _id?: string
    ) { }
}