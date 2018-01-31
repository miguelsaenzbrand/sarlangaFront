export class Ticket {
    constructor(
        public asignado?: string,
        public detalle?: string,
        public estado?: string,
        public creado?: number,
        public incidencia?: string,
        public prioridad?: string,
        public usuario?: string,
        public _id?: string
    ) { }
}