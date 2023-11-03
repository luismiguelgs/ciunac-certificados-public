import { styled } from '@mui/material/styles';

export const TIPO_SOLICITUD = [
    {value:'CERTIFICADO_DE_ESTUDIO',label:'CERTIFICADO DE ESTUDIO'},
    {value:'DUPLICADO_DE_CERTIFICADO',label:'DUPLICADO DE CERTIFICADO'},
    {value:'CONSTANCIA_DE_NOTAS',label:'CONSTANCIA DE NOTAS'},
    {value:'CONSTANCIA_DE_MATRICULA',label:'CONSTANCIA DE MATRICULA'},
]
export const IDIOMA = [
    {value:'INGLES',label:'INGLÉS'},
    {value:'ITALIANO',label:'ITALIANO'},
    {value:'PORTUGUEZ',label:'PORTUGUÉS'},
    {value:'FRANCES',label:'FRANCÉS'},
]
export const NIVEL = [
    {value:'BASICO',label:'BÁSICO'},
    {value:'INTERMEDIO',label:'INTERMEDIO'},
    {value:'AVANZADO',label:'AVANZADO'},
]
export const STEPS = [
    'Información Básica',
    'Trabajador UNAC',
    'Matricula anterior al 2010',
    'Información de pago',
]
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const FACULTADES = [
    {value:'CIENCIAS_DE_LA_SALUD',label:'CIENCIAS DE LA SALUD'},
    {value:'CIENCIAS_ADMINISTRATIVAS',label:'CIENCIAS ADMINISTRATIVAS'},
    {value:'CIENCIAS_CONTABLES',label:'CIENCIAS CONTABLES'},
    {value:'CIENCIAS_ECONÓMICAS',label:'CIENCIAS ECONÓMICAS'},
    {value:'ING_ELECTRICA_Y_ELECTRONICA',label:'ING. ELÉCTRICA Y ELECTRÓNICA'},
    {value:'ING_INDUSTRIAL_Y_SISTEMAS',label:'ING. INDUSTRIAL Y SISTEMAS'},
    {value:'ING_MECANICA_Y_ENERGIA',label:'ING. MECÁNICA Y ENERGIA'},
    {value:'ING_PESQUERA_Y_ALIMENTOS',label:'ING. PESQUERA Y ALIMENTOS'},
    {value:'ING_QUIMICA',label:'ING. QUÍMICA'},
    {value:'CIENCIAS_NATURALES_Y_MATEMATICAS',label:'CIENCIAS NATURALES Y MATEMÁTICAS'},
    {value:'ING_AMBIENTAL_Y_RECURSOS_NATURALES',label:'ING. AMBIENTAL Y RECURSOS NATURALES'},
]
export const MES = [
    {value:'ENERO',label:'Enero'},
    {value:'FEBRERO',label:'Febrero'},
    {value:'MARZO',label:'Marzo'},
    {value:'ABRIL',label:'Abril'},
    {value:'MAYO',label:'Mayo'},
    {value:'JUNIO',label:'Junio'},
    {value:'JULIO',label:'Julio'},
    {value:'AGOSTO',label:'Agosto'},
    {value:'SETIEMBRE',label:'Setiembre'},
    {value:'OCTUBRE',label:'Octubre'},
    {value:'NOVIEMBRE',label:'Noviembre'},
    {value:'DICIEMBRE',label:'Diciembre'},
]
export enum CICLOS {
    INGLES_BASICO = 9,
    INGLES_INTERMEDIO = 9,
    INGLES_AVANZADO = 9,
    PORTUGUEZ_BASICO = 5,
    PORTUGUEZ_INTERMEDIO = 4,
    PORTUGUEZ_AVANZADO = 3,
    ITALIANO_BASICO = 5,
    ITALIANO_INTERMEDIO = 4,
    ITALIANO_AVANZADO = 3,
    FRANCES_BASICO = 5,
    FRANCES_INTERMEDIO = 4,
    FRANCES_AVANZADO = 3
}