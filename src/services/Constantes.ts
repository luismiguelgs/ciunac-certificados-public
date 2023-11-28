import { styled } from '@mui/material/styles';

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