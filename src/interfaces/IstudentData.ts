export interface IstudentData{
    apellidos:string,
    nombres:string,
    celular:string,
    facultad:string,
    codigo:string
    idioma:string,
    nivel:string
}
export interface IstudentVal{
    apellidos:boolean,
    nombres:boolean,
    celular:boolean
    codigo:boolean,
}
export interface StudentRef {
    miFuncion: () => void;
}