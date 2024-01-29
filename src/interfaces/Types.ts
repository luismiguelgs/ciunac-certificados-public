export interface Itexto{
    id?:string,
    titulo:string,
    texto:string,
    creado?:string,
    modificado?:string
}
export interface Ifacultad{
    id?:string,
    value:string,
    label:string,
    creado?:string,
    modificado?:string
}
export interface Icurso{
    id?:string,
    value:string,
    label:string,
    creado?:string,
    modificado?:string
}
export interface Irow{
    id:number,
    ciclo:String,
    mes:String,
    anno:String,
    profesor?:String
}
export interface IformData{
    ciclo:string,
    mes:string,
    anno:string,
    profesor:string
}
export interface Icertificado{
    id?:string,
    value:string,
    label:string,
    precio:number
}