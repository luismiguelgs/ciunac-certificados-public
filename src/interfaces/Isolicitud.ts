import { Timestamp } from "firebase/firestore";

export interface Isolicitud {
    id?:string,
    solicitud:string,
    antiguo:boolean,
    apellidos:string,
    nombres:string,
    celular:string,
    certificado_trabajo?:string,
    codigo?:string,
    dni:string,
    email:string,
    idioma:string,
    nivel:string,
    numero_voucher?:string,
    facultad?:string,
    fecha_pago?:string,
    timestamp?:string,
    trabajador:boolean,
    voucher?:string,
    estado?:string,
    pago:string,
    creado?:string | Timestamp
}