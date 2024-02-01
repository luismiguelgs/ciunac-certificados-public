export interface IbasicVal{
    email:boolean,
    dni:boolean,
}
export interface IfinVal{
    imagen:boolean,
    voucher:boolean,
    pago:boolean
    fecha:boolean
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