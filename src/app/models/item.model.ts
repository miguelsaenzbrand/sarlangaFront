export class Item {
    constructor(
        public descripcion?: string,
        public estado?: string,
        public creado?: string,
        public modificado?: string,
        public img?: string,
        public marca?: string,
        public modelo?: string,
        public nombre?: string,
        public numeroserie?: string,
        public observaciones?: string,
        public patrimonio?: boolean,
        public usuario?: string,
        public _id?: string
    ) { }
}